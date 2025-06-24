package pages

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"strings"
)

type BlogPost struct {
	ID      string `json:"_id,omitempty"`
	Rev     string `json:"_rev,omitempty"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"author"`
}

func (b *BlogPost) Build() string {
	var Response []BlogPost
	resp, err := http.Get("http://0.0.0.0:8080/posts/all")
	if err != nil {
		slog.Error("%s - error - %s", "Error making GET request", err)
	}
	defer resp.Body.Close()
	if err := json.NewDecoder(resp.Body).Decode(&Response); err != nil {
		slog.Error("error decoding response body", "error", err)
	}

	var blogDiv strings.Builder
	for i := range Response {
		blogDiv.WriteString(Response[i].BuildBlogsDiv())
	}

	var html strings.Builder
	html.WriteString(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Blogs</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        .status {
            margin-bottom: 10px;
        }

        .status span {
            font-weight: bold;
        }

        .message-list {
            border: 1px solid #ccc;
            padding: 10px;
            max-height: 300px;
            overflow-y: auto;
            margin-top: 10px;
            background: #f9f9f9;
        }

        .message-item {
            margin-bottom: 4px;
        }
    </style>
</head>

<body>

<div class="status">
        NATS Status: <span id="natsConnectionStatus" style="color: gray;">Unknown</span><br />
    </div>
<h2>Create New Entry</h2>
<form class="w-50">
<!-- Name -->
<div class="mb-3">
<label for="name" class="form-label">Name</label>
<input type="text" class="form-control" id="name" placeholder="Enter your name">
</div>

<!-- Title -->
<div class="mb-3">
<label for="title" class="form-label">Title</label>
<input type="text" class="form-control" id="title" placeholder="Enter title">
</div>
<div class="mb-3">
    <label for="content" class="form-label">Content</label>
    <textarea class="form-control" id="content" rows="5" placeholder="Write your content here..."></textarea>
</div>

<!-- Content -->

<button type="submit" class="btn btn-primary" id="sendBrowserMessageButton">Submit</button>
</form>

    <div class="blogs" id="messages">` + blogDiv.String() + `</div>

    <script type="module">
    //js
    import { connect, StringCodec, createInbox } from "/static/nats1.js";

    const statusSpan = document.getElementById("natsConnectionStatus");
    const messagesDiv = document.getElementById("messages");
    const title = document.getElementById("title");
    const author = document.getElementById("name");
    const content = document.getElementById("content");
    const sendButton = document.getElementById("sendBrowserMessageButton");

    async function connectNATS() {
        try {
            const nc = await connect({ servers: "ws://localhost:8222" });

            statusSpan.textContent = "Connected";
            statusSpan.style.color = "green";

            const sc = StringCodec();
            // --- Publish message to Go backend ---
            sendButton.addEventListener("click", async (event) => {
                 event.preventDefault(); // Prevent form submission
                const titleText = title.value.trim();
                const authorText = author.value.trim();
                const contentText = content.value.trim();

                if (titleText && authorText && contentText) {
                    const msg = await nc.request('browser.msg', sc.encode(JSON.stringify({ title: titleText, author: authorText, content: contentText })));
                    console.log('Got reply:', sc.decode(msg.data));
                    const decoded = sc.decode(msg.data);
                    const msgElem = document.createElement("div");
                    msgElem.className = "message-item";
                    msgElem.textContent += "[REPLY]:" + decoded;
                    messagesDiv.appendChild(msgElem);
                    content.value = "";  // Clear content after submission
                    title.value = "";    // Clear title after submission
                    author.value = "";   // Clear author after submission
                }
            });
        } catch (err) {
            statusSpan.textContent = "Error";
            statusSpan.style.color = "red";
            console.error("NATS connection failed:", err);
        }
    }
    connectNATS();
    //!js
    </script>

</body>

</html>`)
	return html.String()
}

func (b *BlogPost) BuildBlogsDiv() string {
	var html strings.Builder
	html.WriteString(`<div class="message-list" id="messages">
    <b>Title :` + b.Title + `</b> </br>
    Author : ` + b.Author + ` <br>
    Post : ` + b.Content + ` <br>
    </div>`)
	return html.String()
}
