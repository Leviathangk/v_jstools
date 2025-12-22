function make_inject_ast_page_alert(url){
  return `
无法在 chrome:// 页面使用该功能

当前页面: ${url}

请在 http/https/file 页面中使用该功能
  `.trim()
}

function run_local_id_avoid_chrome(func){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    if (tabs[0].url.startsWith('chrome')){
      alert(make_inject_ast_page_alert(tabs[0].url))
    }else{
      func(tabs[0].id)
    }
  });
}

function run_codes(tabId, input, world, args){
  if (typeof input == 'function'){
    args = args || []
    return chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: input,
      args: args,
      injectImmediately: true,
      world: world,
    })
  }else{
    return chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: input,
      injectImmediately: true,
      world: world,
    })
  }
}