const go = async () => {
  console.log("Hello from Lit Action");

  LitActions.setResponse({
    response: JSON.stringify({
      data: "Hello from Lit Action",
    }),
  });
}
go();
