const Validate = (fields) => {
    /*const letterOnly = /^[a-zA-Z\s-.]*$/;
    const numOnly = /^[0-9-().+]+$/;*/
    [].forEach.call(document.querySelectorAll(".error"), (e) => {
        e.classList.remove("error")
    })

    for (let i = 0; i < fields.length; i++) {//validate each field in array with a loop
        let value = "";

        try {
            if (document.querySelector("[name='" + fields[i] + "']").value) {
                value = document.querySelector("[name='" + fields[i] + "']").value;

            }
        } catch (err) {
            document
                .querySelector("[name='" + fields[i] + "']")
                .classList.add("error");
        }
        if (value === "default") {
            document
                .querySelector("[name='" + fields[i] + "']")
                .classList.add("error");
        }
    }

    if (document.querySelector(".error") !== null) {
        globalAlert("alert-warning", "there are errors in your form.");
        return false;
    }
}