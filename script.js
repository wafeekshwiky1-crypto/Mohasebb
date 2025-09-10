document.addEventListener('DOMContentLoaded', function(){
  // وضع السنة
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // مسح النموذج
  document.querySelectorAll('.reset').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const form = document.getElementById('contactForm');
      if (form) form.reset();
      const status = document.getElementById('formStatus');
      if (status) status.textContent = '';
    })
  });

  // إرسال AJAX بسيط (يتطلب action فعّال)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      if (status) status.textContent = 'جارٍ الإرسال...';
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, { method: form.method, headers: {'Accept':'application/json'}, body: data});
        if (res.ok){
          if (status) status.textContent = 'تم استلام طلبك! سنعاود الاتصال قريبًا.';
          form.reset();
        } else {
          const json = await res.json().catch(()=>null);
          if (status) status.textContent = (json && json.error) ? ('خطأ: '+json.error) : 'حدث خطأ أثناء الإرسال.';
        }
      } catch(err){
        if (status) status.textContent = 'خطأ في الاتصال. يمكنك التواصل مباشرة عبر الواتساب.';
      }
    });
  }

  // Nav toggle بسيط للهواتف
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav){
    toggle.addEventListener('click', ()=>{
      nav.classList.toggle('open');
    });
  }
});