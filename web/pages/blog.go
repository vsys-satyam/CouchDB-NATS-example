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

    <div class="blogs" id="messageblogs">` + blogDiv.String() + `</div>
    <div id="edit-dialog"></div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q" crossorigin="anonymous"></script>
    <script type="module">
    //js
    import { connect, StringCodec, createInbox } from "/static/nats1.js";

    const statusSpan = document.getElementById("natsConnectionStatus");
    const messagesDiv = document.getElementById("messageblogs");
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
                    const msg = await nc.request('blog.msg.create', sc.encode(JSON.stringify({ title: titleText, author: authorText, content: contentText })));
                    // console.log('Got reply:', sc.decode(msg.data));
                    const decoded = sc.decode(msg.data);
                    messagesDiv.innerHTML += decoded;
                    content.value = "";  
                    title.value = ""; 
                    author.value = "";
                }
                attachDeleteListeners();
                attachEditDialogListeners();
            });

            // --- Attach delete handler to all buttons ---
            function attachDeleteListeners() {
                document.querySelectorAll(".delete-btn").forEach(button => {
                    button.onclick = () => {
                        const messageDiv = button.closest(".message-list");
                        const postId = messageDiv.id.replace("messages-", "");

                        const titleEl = messageDiv.querySelector(".message-title");
                        const messageTitle = titleEl ? titleEl.textContent.replace("Title :", "").trim() : "(Unknown Title)";

                        if (confirm("Delete post: " + messageTitle)) {
                            nc.publish("blog.msg.delete", sc.encode(postId));
                            messageDiv.remove();
                        }
                    };
                });
            }

            function attachEditDialogListeners() {
                document.querySelectorAll(".edit-btn").forEach(button => {
                    button.onclick = async () => { 
                        const dialogDiv = document.getElementById("edit-dialog");
                        const messageDiv = button.closest(".message-list"); 
                        const postId = messageDiv.id.replace("messages-", "");

                        try {
                            const msg = await nc.request('blog.msg.editdialog', sc.encode(postId));
                            const decoded = sc.decode(msg.data);
                            dialogDiv.innerHTML = decoded;
                            const modalElement = document.getElementById("editModal");
                            const modal = new bootstrap.Modal(modalElement);
                            attachEditFormSubmitHandler();
                            modal.show();
                        } catch (err) {
                            console.error("Failed to fetch edit dialog:", err);
                        }
                    };
                });
            }

            function attachEditFormSubmitHandler() {
                const submitBtn = document.getElementById("sendEditMessageButton");
                const modalElement = document.getElementById("editModal");

                submitBtn.onclick = async (e) => {
                    e.preventDefault();

                    const postId = modalElement.getAttribute("data-id");
                    const name = document.getElementById("name-edit").value.trim();
                    const title = document.getElementById("title-edit").value.trim();
                    const content = document.getElementById("content-edit").value.trim();

                    const payload = {
                        _id: postId,
                        author: name,
                        title: title,
                        content: content
                    };

                    try {
                        const msg = await nc.request('blog.msg.update', sc.encode(JSON.stringify(payload)));
                        const decoded = sc.decode(msg.data);
                        messagesDiv.innerHTML = decoded;
                        attachDeleteListeners();
                        attachEditDialogListeners();
                        const modal = bootstrap.Modal.getInstance(modalElement);
                        modal.hide();
                    } catch (err) {
                        console.error("Failed to submit edit:", err);
                    }
                };
            }

            // Call once in case there are already rendered messages
            attachDeleteListeners();
            attachEditDialogListeners();

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
	html.WriteString(`<div class="message-list" id="messages-` + b.ID + `" style="position: relative; border: 1px solid #ccc; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
    <!-- Button Wrapper -->
    <div style="position: absolute; top: 5px; right: 5px; display: flex; gap: 5px;">
        <button class="btn btn-sm btn-primary edit-btn">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
    </div>
    <b class="message-title">Title :` + b.Title + `</b> <br>
    Author : ` + b.Author + ` <br>
    Post : ` + b.Content + ` <br>
</div>`)
	return html.String()
}

func (b *BlogPost) BuildEditDialog() string {
	var html strings.Builder
	html.WriteString(`<!--html--> 
        <div class="modal fade" id="editModal" data-id="` + b.ID + `" tabindex="-1" aria-labelledby="blogFormModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
            
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title" id="blogFormModalLabel">Edit Blog Post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body with Form -->
            <div class="modal-body">
                <form id="blogPostForm">
                <!-- Name -->
                <div class="mb-3">
                    <label for="name-edit" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name-edit" value="` + b.Author + `">
                </div>

                <!-- Title -->
                <div class="mb-3">
                    <label for="title-edit" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title-edit" value="` + b.Title + `">
                </div>

                <!-- Content -->
                <div class="mb-3">
                    <label for="content-edit" class="form-label">Content</label>
                    <textarea class="form-control" id="content-edit" rows="5" >` + b.Content + `</textarea>
                </div>
                </form>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" id="sendEditMessageButton" >Submit</button>
            </div>
            </div>
        </div>
        </div>
    <!--!html-->`)
	return html.String()
}
