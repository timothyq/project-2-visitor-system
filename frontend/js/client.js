function MyClientModule() {
  //const clientModule = {};
  const divContent = document.querySelector("#content");
  //let currentUser = null;

  const msgDiv = document.querySelector("div#messages");

  function checkForErrors() {
    // From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    console.log("urlParams", params.msg);

    if (params.msg) {
      msgDiv.querySelector("#content").innerHTML = params.msg;
      msgDiv.style.display = "block";
    }
  }

  //   function renderSystem(visitors) {
  //     divContent.innerHTML = `<h2>Visitors tracked by ${currentUser.user}</h2>
  //     ${visitors.map((v) => `<div>Text: ${v.text}</div>`).join("")}
  //     `;
  //   }

  //   async function openSystem() {
  //     let res;
  //     try {
  //       if (user) {
  //         res = await fetch("./openSystem");
  //         const system = await res.json;
  //         renderSystem(system);
  //       }
  //     } catch (err) {
  //       // TODO Implement error handling for user
  //       console.log(err);
  //     }
  //   }

  //   // To redirect to different app page
  //   function redirect(page) {
  //     window.location.replace(page + ".html");
  //   }

  //Function for user authentication
  async function checkIfLoggedIn() {
    let res;
    try {
      res = await fetch("/system");
      const resUser = await res.json();
      const spanIsAuth = document.querySelector("span#isAuth");

      if (resUser.user != null) {
        spanIsAuth.innerHTML = "Logged in as " + resUser.user;
      } else {
        spanIsAuth.innerHTML = "Not Logged In";
      }
    } catch (err) {
      console.log(err);
    }
  }

  checkForErrors();
  //   openSystem();
  checkIfLoggedIn();
}

MyClientModule();
