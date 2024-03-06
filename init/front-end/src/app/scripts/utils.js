
export function parseUrl(url = window.location.href) {
  var query = url.split("?")[1] || "";
  return (url.split("?")[1] ?? "")
    .split("&")
    .map((q) => q.split("="))
    .reduce((params, [k, v]) => ({ ...params, [k]: v }), {});
}
