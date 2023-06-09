/*************************************************************************************************************************
 *************************************************************************************************************************
****************************** For dynamically changing the like and dislike amounts on the posts with AJAX***************
**************************************************************************************************************************
*************************************************************************************************************************/

const likeButton = document.getElementById("like-button");
const dislikeCount = document.querySelector(".dislike-number");
const likeCount = document.querySelector(".like-number");
const dislikeButton = document.getElementById("dislike-button");

likeButton.addEventListener("click", () => {
  const postId = likeButton.getAttribute("data-postid");

  // Send a GET request to check if the user has liked/disliked the post before
  const xhrGet = new XMLHttpRequest();
  xhrGet.open("GET", `/post/${postId}/like`, true);
  xhrGet.onreadystatechange = function () {
    if (xhrGet.readyState === XMLHttpRequest.DONE) {
      if (xhrGet.status === 200) {
        const response = JSON.parse(xhrGet.responseText);
        // hasLiked and hasDisliked are boolean values from the server
        const hasLiked = response.hasLiked;
        const hasDisliked = response.hasDisliked;

        if (hasLiked) {
          // if you already liked the post
          console.log("You already liked this post");
          return;
        } else if (hasDisliked) {
          // If you had earlier disliked the post and decided to like it,
          // it will take your dislike away.
          const dislikeCount = document.querySelector(".dislike-number");
          dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
        }
        const xhrPost = new XMLHttpRequest();
        // Post to the server the like
        xhrPost.open("POST", `/post/${postId}/like`, true);
        xhrPost.setRequestHeader("Content-Type", "application/json");
        xhrPost.onreadystatechange = function () {
          if (xhrPost.readyState === XMLHttpRequest.DONE) {
            if (xhrPost.status === 201) {
              // Add +1 to the likes
              const likeCount = document.querySelector(".like-number");
              likeCount.textContent = parseInt(likeCount.textContent) + 1;
              // Make the like count bounce.
              likeCount.classList.add('bounce-animation');
              setTimeout(function() {
                likeCount.classList.remove('bounce-animation');
              }, 500);
            } else {
              console.error("Error:", xhrPost.status);
            }
          }
        };
        xhrPost.send();
      } else {
        console.error("Error:", xhrGet.status);
      }
    }
  };
  xhrGet.send();
});

// This literally is a copy paste from the likebutton from above.
dislikeButton.addEventListener("click", () => {
    const postId = dislikeButton.getAttribute("data-postid");

    // Send a GET request to check if the user has liked/disliked the post before
    const xhrGet = new XMLHttpRequest();
    xhrGet.open("GET", `/post/${postId}/like`, true);
    xhrGet.onreadystatechange = function () {
      if (xhrGet.readyState === XMLHttpRequest.DONE) {
        if (xhrGet.status === 200) {
          const response = JSON.parse(xhrGet.responseText);
          const hasLiked = response.hasLiked;
          const hasDisliked = response.hasDisliked;

          if (hasDisliked) {
            console.log("You already disliked this post");
            return;
          } else if (hasLiked) {
            const likeCount = document.querySelector(".like-number");
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
          }
          const xhrPost = new XMLHttpRequest();
          xhrPost.open("POST", `/post/${postId}/dislike`, true);
          xhrPost.setRequestHeader("Content-Type", "application/json");
          xhrPost.onreadystatechange = function () {
            if (xhrPost.readyState === XMLHttpRequest.DONE) {
              if (xhrPost.status === 201) {
                const dislikeCount = document.querySelector(".dislike-number");
                dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
              } else {
                console.error("Error:", xhrPost.status);
              }
            }
          };
          xhrPost.send();
        } else {
          console.error("Error:", xhrGet.status);
        }
      }
    };
    xhrGet.send();
  });

/*************************************************************************************************************************
 *************************************************************************************************************************
 ***************************DYNAMICALLY CHANGING THE AMOUNT OF LIKES ON COMMENTS USING AJAX*******************************
 ************************************************************************************************************************/


const comlikeButtons = document.querySelectorAll(".comlike-button");
const comdislikeCount = document.querySelector(".comdislike-number");
const comlikeCount = document.querySelector(".comlike-number");
const comdislikeButtons = document.querySelectorAll(".comdislike-button");

comlikeButtons.forEach((comlikeButton) => {
  comlikeButton.addEventListener("click", () => {
    const commentId = comlikeButton.getAttribute("data-commentid");
    const postId = comlikeButton.getAttribute("data-postid");
    // Send a GET request to check if the user has liked/disliked the comment before
    const xhrGet = new XMLHttpRequest();
    xhrGet.open("GET", `/post/${postId}/${commentId}/like`, true);
    xhrGet.onreadystatechange = function () {
      if (xhrGet.readyState === XMLHttpRequest.DONE) {
        if (xhrGet.status === 200) {
          const response = JSON.parse(xhrGet.responseText);
          // comhasLiked and comhasDisliked are boolean values from the server
          const comhasLiked = response.comhasLiked;
          const comhasDisliked = response.comhasDisliked;

          if (comhasLiked) {
            // if you already liked the comment
            console.log("You already liked this comment");
            return;
          } else if (comhasDisliked) {
            // If you had earlier disliked the comment and decided to like it,
            // it will take your dislike away.
            const comdislikeCount = comlikeButton.parentElement.querySelector(".comdislike-number");
            comdislikeCount.textContent = parseInt(comdislikeCount.textContent) - 1;
          }

          const xhrPost = new XMLHttpRequest();
          // Post to the server the like
          xhrPost.open("POST", `/post/${postId}/${commentId}/like`, true);
          xhrPost.setRequestHeader("Content-Type", "application/json");
          xhrPost.onreadystatechange = function () {
            if (xhrPost.readyState === XMLHttpRequest.DONE) {
              if (xhrPost.status === 201) {
                // Add +1 to the likes
                const comlikeCount = comlikeButton.parentElement.querySelector(".comlike-number");
                comlikeCount.textContent = parseInt(comlikeCount.textContent) + 1;
                // Make the like count number bounce when you like a comment
                comlikeCount.classList.add('bounce-animation');
                setTimeout(function() {
                  comlikeCount.classList.remove('bounce-animation');
                }, 500);
              } else {
                console.error("Error:", xhrPost.status);
              }
            }
          };
          xhrPost.send();
        } else {
          console.error("Error:", xhrGet.status);
        }
      }
    };
    xhrGet.send();
  });
});

comdislikeButtons.forEach((comdislikeButton) => {
  comdislikeButton.addEventListener("click", () => {
    const commentId = comdislikeButton.getAttribute("data-commentid");
    const postId = comdislikeButton.getAttribute("data-postid");

    // Send a GET request to check if the user has liked/disliked the comment before
    const xhrGet = new XMLHttpRequest();
    xhrGet.open("GET", `/post/${postId}/${commentId}/like`, true);
    xhrGet.onreadystatechange = function () {
      if (xhrGet.readyState === XMLHttpRequest.DONE) {
        if (xhrGet.status === 200) {
          const response = JSON.parse(xhrGet.responseText);
          const comhasLiked = response.comhasLiked;
          const comhasDisliked = response.comhasDisliked;

          if (comhasDisliked) {
            console.log("You already disliked this comment");
            return;
          } else if (comhasLiked) {
            const comlikeCount = comdislikeButton.parentElement.querySelector(".comlike-number");
            comlikeCount.textContent = parseInt(comlikeCount.textContent) - 1;
          }

          const xhrPost = new XMLHttpRequest();
          xhrPost.open("POST", `/post/${postId}/${commentId}/dislike`, true);
          xhrPost.setRequestHeader("Content-Type", "application/json");
          xhrPost.onreadystatechange = function () {
            if (xhrPost.readyState === XMLHttpRequest.DONE) {
              if (xhrPost.status === 201) {
                const comdislikeCount = comdislikeButton.parentElement.querySelector(".comdislike-number");
                comdislikeCount.textContent = parseInt(comdislikeCount.textContent) + 1;
              } else {
                console.error("Error:", xhrPost.status);
              }
            }
          };
          xhrPost.send();
        } else {
          console.error("Error:", xhrGet.status);
        }
      }
    };
    xhrGet.send();
  });
});

/**********************************************************************************
***********************************************************************************
***************************Dropdown menu for sorting comments**********************
***********************************************************************************
**********************************************************************************/

function sortComments() {
  document.getElementById("sort-comments").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/**********************************************************************************
***********************************************************************************
***************************Making the App div appear on page load******************
***********************************************************************************
**********************************************************************************/

window.addEventListener("load", function () {
  var div = document.getElementById("Appid");
  div.classList.add("appear");
});


// Lightbox for opening a image
lightbox.option({
  'resizeDuration': 200,
  'wrapAround': true
});