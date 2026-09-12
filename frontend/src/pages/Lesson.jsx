@@
 export default function Lesson(){
   const { id } = useParams()
-  const [lang,setLang]=useState(localStorage.getItem('mlp_lang')||'en')
+  const [lang,setLang]=useState(localStorage.getItem('mlp_lang')||'en')
   const [lesson,setLesson]=useState(null)
   const [loading,setLoading]=useState(true)
   const [explainText,setExplainText]=useState('')
 
   useEffect(()=>{ load() },[id,lang])
+  useEffect(()=>{
+    // listen for global language changes
+    function onLang(e){ if (e?.detail) setLang(e.detail) }
+    window.addEventListener('mlp:lang', onLang)
+    return ()=> window.removeEventListener('mlp:lang', onLang)
+  },[])
   async function load(){ setLoading(true); try{ const data = await getLesson(id, lang); setLesson(data); }catch(e){ console.error(e) } finally{ setLoading(false) } }
