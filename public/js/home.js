$(document).ready(()=>{
  $.get("/api/posts",results=> {

    outputPost(results,$(".postContainer"))
  
  })
})

function outputPost(results,container){
  console.log("res"+results)
  container.html("")
  results.forEach(result => {
    var html=createPosthtml(result)
    container.append(html)
    if(results.lenght==0){
      container.append("<span class=' No Results'>No Posts Found</span>")
    }

    
  });

  

 
 

}

function timeDifference(current, previous) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
      if(elapsed/1000<30)return "Just now"
       return Math.round(elapsed/1000) + ' seconds ago';   
  }

  else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' minutes ago';   
  }

  else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + ' hours ago';   
  }

  else if (elapsed < msPerMonth) {
      return   Math.round(elapsed/msPerDay) + ' days ago';   
  }

  else if (elapsed < msPerYear) {
      return  Math.round(elapsed/msPerMonth) + ' months ago';   
  }

  else {
      return Math.round(elapsed/msPerYear ) + ' years ago';   
  }
}