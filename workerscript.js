self.addEventListener("message", (event) => {
  console.log(event.data);
  if (event.data == "hi") {
    var fetchPromise = fetch("https://s3.browsebetter.io/checkcors.html", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });

    console.log(fetchPromise);
  }
});
