
import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");


const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
};

const increasingNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const sendComment = async comment => {
    const videoId = window.location.href.split("/videos/")[1];
    console.log(videoId);
    const response = await axios({
      method: "post",
      url: `/api/video/${videoId}/comment`,
      data: {
        comment
      }
    });
    if (response.status === 200) { 
        addComment(comment);
        increasingNumber();
    }
};

const handleSubmit = event => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    console.log(comment);
    sendComment(comment);
    commentInput.value = "";
};

const deleteComment = async (event) => {
  const { target } = event;
  const btnParent = target.parentNode;
  const videoId = btnParent.getAttribute("data-id");
  const { status } = await axios({
    method: "delete",
    url: `/api/comment/${videoId}/delete`
  });
  if (status === 200) {
    decreaseCommentCount();
    destroyComment(btnParent);
  }
};


function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
    init();
}