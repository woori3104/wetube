"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForm = document.getElementById("jsAddComment");
var commentList = document.getElementById("jsCommentList");
var commentNumber = document.getElementById("jsCommentNumber");
var deleteComment = document.querySelectorAll(".video__comments-delete");

var addComment = function addComment(comment, commentId) {
  var li = document.createElement("li");
  var span = document.createElement("span");
  var deleteButton = document.createElement("span");
  deleteButton.innerHTML = '❌';
  deleteButton.classList.add('video__comments-delete');
  deleteButton.dataset.commentid = commentId;
  span.innerHTML = comment;
  li.appendChild(span);
  li.appendChild(deleteButton);
  deleteButton.addEventListener("click", handleDeleteComment);
  commentList.prepend(li);
  increaseNumber();
};

var increasingNumber = function increasingNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

var decreaseCommentCount = function decreaseCommentCount() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

var sendComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(comment) {
    var videoId, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videoId = window.location.href.split("/videos/")[1];
            _context.next = 3;
            return (0, _axios["default"])({
              method: "post",
              url: "/api/".concat(videoId, "/comment"),
              data: {
                comment: comment
              }
            });

          case 3:
            response = _context.sent;

            if (response.status === 200) {
              addComment(comment, response.data.commentId);
              increasingNumber();
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleDeleteComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    var videoId, comment, commentId, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("delete");
            videoId = window.location.href.split("/videos/")[1];
            comment = event.target.parentNode;
            commentId = event.target.dataset.commentid;
            comment.style.display = "none";
            decreaseCommentCount();
            _context2.next = 8;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment/delete"),
              method: "POST",
              data: {
                commentId: commentId
              }
            });

          case 8:
            response = _context2.sent;

            if (response.status === 200) {
              deleteComment(comment);
            } else {
              console.log('error', response);
              comment.style.display = "list-item";
            }

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function handleDeleteComment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var handleSubmit = function handleSubmit(event) {
  event.preventDefault();
  var commentInput = addCommentForm.querySelector("input");
  var comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  console.log(deleteComment);
  Array.from(deleteComment).forEach(function (currentComment) {
    console.log(currentComment);
    currentComment.addEventListener("click", handleDeleteComment);
  });
}

if (addCommentForm) {
  init();
}