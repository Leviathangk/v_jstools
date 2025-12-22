function run_local_id_avoid_chrome(func){ func() }
function run_codes(tabId, input, world, args){ 
    return new Promise(function(res){
        res(input(...(args || [])))
    }) 
}
chrome.storage.local.get(['ai_window_open'], function(res){
    console.log('ai_window_open:', res)
    if (res['ai_window_open'] == '1'){
        open_ai_agent()
    }
})