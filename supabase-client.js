(function(){
  const config=window.SUPABASE_CONFIG||{};
  const isConfigured=config.url&&config.key&&!config.url.includes('YOUR_PROJECT_REF')&&!config.key.includes('YOUR_PUBLISHABLE');
  const sessionKey='lunch-menu-session-id';
  function getSessionId(){let id;try{id=localStorage.getItem(sessionKey);if(!id){id=crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;localStorage.setItem(sessionKey,id)}}catch(error){id=`session-${Date.now()}-${Math.random().toString(36).slice(2)}`}return id}
  async function insert(table,row){if(!isConfigured){console.info('[Supabase] 설정 전이라 선택 정보를 로컬에만 표시합니다.',row);return {ok:false,configured:false}}try{const response=await fetch(`${config.url}/rest/v1/${table}`,{method:'POST',headers:{apikey:config.key,Authorization:`Bearer ${config.key}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(row)});if(!response.ok){const message=await response.text();console.error(`[Supabase] ${table} 저장 실패:`,message);return {ok:false,error:message}}return {ok:true}}catch(error){console.error(`[Supabase] ${table} 연결 실패:`,error);return {ok:false,error}}}
  window.saveLunchChoice=(menu,source='recommendation')=>insert('lunch_choices',{menu_name:menu.name,menu_emoji:menu.emoji||null,choice_source:source,session_id:getSessionId()});
  window.saveFavorite=menu=>insert('lunch_favorites',{menu_name:menu.name,menu_emoji:menu.emoji||null,session_id:getSessionId()});
})();
