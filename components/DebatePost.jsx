import React from "react"
import PostComments from "./PostComments"
import PostContent from "./PostContent"
import postData from "../postData"
import { nanoid } from "nanoid"

export default function DebatePost() {

    let blank = {
        id: nanoid(),
        userName: "",
        isAnonymous: false,
        commentText: ""

    }
    const [comments, setComments] = React.useState(postData.comments)
    const [currentPost, setCurrentPost] = React.useState(blank)
    function handleSubmit(e) {
        e.preventDefault()
        setComments(prev => {
            return [...prev, currentPost]
        })
        setCurrentPost(blank)
    }

    function handleOnchange(e) {
        setCurrentPost(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="post-container">
            <PostContent data={{ ...postData }} />
            <PostComments data={comments} />
            <form onSubmit={handleSubmit}>
                <input
                    className="text-input"
                    type="text"
                    placeholder="Enter username."
                    name="userName"
                    onChange={handleOnchange}
                    value={currentPost.userName}
                />
                <textarea
                    className="textarea"
                    placeholder="What do you think?"
                    name="commentText"
                    onChange={handleOnchange}
                    value={currentPost.commentText}
                />
                <label>
                    <input
                        className="checkbox"
                        type="checkbox"
                        onChange={() => setCurrentPost(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
                        checked={currentPost.isAnonymous}
                    />
                    Post anonymously?
                </label>
                <button>Send</button>
            </form>
        </div>
    )
}