(function () {
  var MAX_BYTES = 10 * 1024 * 1024;
  var form = document.getElementById("apply-form");
  var status = document.getElementById("form-status");

  function showStatus(message, isError) {
    status.textContent = message;
    status.classList.toggle("is-error", Boolean(isError));
    status.hidden = false;
  }

  form.querySelectorAll(".file-drop input").forEach(function (input) {
    input.addEventListener("change", function () {
      var drop = input.closest(".file-drop");
      var label = drop.querySelector(".file-name");
      var file = input.files[0];
      if (file && file.size > MAX_BYTES) {
        input.value = "";
        file = null;
        showStatus("文件超过 10MB，请压缩后重新选择。", true);
      }
      label.textContent = file ? file.name : label.dataset.empty;
      drop.classList.toggle("has-file", Boolean(file));
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!form.querySelector('input[name="direction"]:checked')) {
      showStatus("请至少选择一个意向方向。", true);
      return;
    }
    // The submission endpoint is not connected yet; nothing leaves the browser.
    showStatus("在线投递即将开放。目前请将简历与方案发送至 zhangyzhsh@gmail.com。", false);
  });
})();
