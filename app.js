
  (()=>{
    'use strict';
    // PERSONALIZE: insira aqui o WhatsApp da loja (somente números com DDI e DDD, ex. 5531999999999).
    // Se ficar vazio, o botão abre o compartilhamento no WhatsApp, sem contato de destino definido.
    const CONFIG = { whatsappNumber: '' };
    const uniquePhotos = ["assets/produto-01.webp", "assets/produto-02.webp", "assets/produto-03.webp", "assets/produto-04.webp", "assets/produto-05.webp", "assets/produto-06.webp", "assets/produto-07.webp", "assets/produto-08.webp", "assets/produto-09.webp", "assets/produto-10.webp", "assets/produto-11.webp", "assets/produto-12.webp"];
    const products = [
  {
    "id": 1,
    "name": "Capinha Silicone Preta",
    "category": "capinhas",
    "label": "Silicone",
    "image": "assets/produto-02.webp",
    "bg": "#e8ebe4"
  },
  {
    "id": 2,
    "name": "Capinha Transparente",
    "category": "capinhas",
    "label": "Clássica",
    "image": "assets/produto-01.webp",
    "bg": "#eef1eb"
  },
  {
    "id": 3,
    "name": "Carregador USB-C Preto",
    "category": "carregadores",
    "label": "Tomada",
    "image": "assets/produto-04.webp",
    "bg": "#e5edf1"
  },
  {
    "id": 4,
    "name": "Película de Vidro",
    "category": "peliculas",
    "label": "Proteção",
    "image": "assets/produto-09.webp",
    "bg": "#e9edf3"
  },
  {
    "id": 5,
    "name": "Capinha Silicone Rosa",
    "category": "capinhas",
    "label": "Cores",
    "image": "assets/produto-03.webp",
    "bg": "#f0eaf6"
  },
  {
    "id": 6,
    "name": "Carregador de Tomada Branco",
    "category": "carregadores",
    "label": "Tomada",
    "image": "assets/produto-05.webp",
    "bg": "#f0ede5"
  },
  {
    "id": 7,
    "name": "Película de Privacidade",
    "category": "peliculas",
    "label": "Privacidade",
    "image": "assets/produto-10.webp",
    "bg": "#e5eced"
  },
  {
    "id": 8,
    "name": "Carregador Veicular",
    "category": "carregadores",
    "label": "No carro",
    "image": "assets/produto-06.webp",
    "bg": "#e8ecec"
  },
  {
    "id": 9,
    "name": "Cabo Multiconector",
    "category": "carregadores",
    "label": "Cabo",
    "image": "assets/produto-07.webp",
    "bg": "#e6efdf"
  },
  {
    "id": 10,
    "name": "Cabo USB-C Trançado",
    "category": "carregadores",
    "label": "Cabo",
    "image": "assets/produto-08.webp",
    "bg": "#e6ede0"
  },
  {
    "id": 11,
    "name": "Fone Bluetooth",
    "category": "acessorios",
    "label": "Sem fio",
    "image": "assets/produto-11.webp",
    "bg": "#edf0eb"
  },
  {
    "id": 12,
    "name": "Suporte para Celular",
    "category": "acessorios",
    "label": "Suporte",
    "image": "assets/produto-12.webp",
    "bg": "#eee8e3"
  }
];
    const byId=id=>document.getElementById(id);
    const itemById=id=>products.find(p=>p.id===id);
    const icons={plus:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'};
    const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const uid=(id,model)=>String(id)+'|'+model;
    const safeCart=()=>{try{const v=JSON.parse(localStorage.getItem('lion-cart-v1')||'[]');return Array.isArray(v)?v.filter(x=>Number.isInteger(x.id)&&itemById(x.id)&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<100&&typeof x.model==='string').slice(0,75):[]}catch{return []}};
    let cart=safeCart(),filter='todos',search='',pending=null,toastTimer=null;
    const persist=()=>{try{localStorage.setItem('lion-cart-v1',JSON.stringify(cart))}catch{}};
    byId('cat-case').innerHTML=`<img src="${uniquePhotos[0]}" alt="Capinha">`;byId('cat-charger').innerHTML=`<img src="${uniquePhotos[3]}" alt="Carregador">`;byId('cat-glass').innerHTML=`<img src="${uniquePhotos[8]}" alt="Película">`;
    function renderProducts(){const q=search.toLocaleLowerCase('pt-BR');const list=products.filter(p=>(filter==='todos'||p.category===filter)&&(!q||(p.name+' '+p.category+' '+p.label).toLocaleLowerCase('pt-BR').includes(q)));byId('count-label').textContent=list.length+' '+(list.length===1?'produto':'produtos');byId('product-grid').innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-art" style="--artbg:${p.bg}"><span class="product-tag">${p.label}</span><img class="product-image" src="${p.image}" alt="${esc(p.name)}" loading="lazy" decoding="async" width="190" height="139"></div><div class="product-info"><span class="product-category">${p.category==='peliculas'?'Películas':p.category==='capinhas'?'Capinhas':p.category==='carregadores'?'Carregadores':'Acessórios'}</span><h3>${esc(p.name)}</h3><div class="product-bottom"><div class="product-price">Sob consulta<small>Consultar disponibilidade</small></div><button class="add-btn" data-add="${p.id}" aria-label="Adicionar ${esc(p.name)} ao carrinho">${icons.plus}</button></div></div></article>`).join(''):`<div class="empty-state"><svg width="42" height="42" style="margin:auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg><b>Nenhum produto encontrado</b>Tente outra busca ou escolha outra categoria.</div>`}
    function setFilter(f){filter=f;document.querySelectorAll('.filter').forEach(b=>{const active=b.dataset.filter===f;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});renderProducts()}
    document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
    document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{search='';byId('search-input').value='';setFilter(b.dataset.category);byId('produtos').scrollIntoView({behavior:'smooth'})}));
    byId('product-grid').addEventListener('click',e=>{const btn=e.target.closest('[data-add]');if(btn)addToCart(Number(btn.dataset.add))});
    byId('search-toggle').addEventListener('click',()=>{const sw=byId('search-wrap'),open=!sw.classList.contains('open');sw.classList.toggle('open',open);byId('search-toggle').setAttribute('aria-expanded',String(open));if(open)byId('search-input').focus();else{byId('search-input').value='';search='';renderProducts()}});
    byId('search-input').addEventListener('input',e=>{search=e.target.value.trim();if(search) setFilter('todos');else renderProducts();byId('produtos').scrollIntoView({behavior:'smooth',block:'start'})});
    const sum=()=>cart.reduce((n,i)=>n+i.qty,0);
    function updateCounts(){const n=sum();byId('header-count').textContent=n;byId('nav-count').textContent=n;byId('drawer-sub').textContent=n===1?'1 item na sua lista':n+' itens na sua lista'}
    function toast(message){clearTimeout(toastTimer);const el=byId('toast');el.textContent=message;el.classList.add('show');toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
    function addToCart(id,model=''){const p=itemById(id);if(!p)return;if(['capinhas','peliculas'].includes(p.category)&&!model){pending=id;byId('modal-title').textContent=p.name;byId('model-input').value='';byId('model-input').classList.remove('invalid');byId('model-error').classList.remove('show');openModal();return}const key=uid(id,model);const existing=cart.find(x=>uid(x.id,x.model)===key);if(existing)existing.qty=Math.min(existing.qty+1,99);else cart.push({id,model,qty:1});persist();updateCounts();renderCart();toast('Adicionado à sua lista!')}
    function renderCart(){const holder=byId('cart-items');if(!cart.length){holder.innerHTML=`<div class="cart-empty"><svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#9aab93" stroke-width="1.1"><path d="M4 7h16l-1.5 13h-13L4 7Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg><h3>Seu carrinho está vazio</h3><p>Escolha os acessórios que você gostou para montar sua lista.</p></div>`;byId('cart-footer').style.display='none';return}byId('cart-footer').style.display='block';holder.innerHTML=cart.map((item,i)=>{const p=itemById(item.id);return `<div class="cart-item"><div class="cart-thumb" style="background:${p.bg}"><img src="${p.image}" alt="${esc(p.name)}"></div><div class="cart-item-info"><b>${esc(p.name)}</b><small>${item.model?'Modelo: '+esc(item.model):'Modelo a confirmar'}</small><div class="qty-row"><button data-qty="-1" data-index="${i}" aria-label="Diminuir quantidade">−</button><span>${item.qty}</span><button data-qty="1" data-index="${i}" aria-label="Aumentar quantidade">+</button><button class="remove-btn" data-remove="${i}">Remover</button></div></div></div>`}).join('')}
    byId('cart-items').addEventListener('click',e=>{const q=e.target.closest('[data-qty]');const r=e.target.closest('[data-remove]');if(q){const i=Number(q.dataset.index);if(cart[i]){cart[i].qty+=Number(q.dataset.qty);if(cart[i].qty<=0)cart.splice(i,1)}}else if(r){cart.splice(Number(r.dataset.remove),1)}else return;persist();updateCounts();renderCart()});
    const overlay=byId('overlay'),drawer=byId('cart-drawer'),modal=byId('model-modal');
    function closeAll(){overlay.classList.remove('open');drawer.classList.remove('open');modal.classList.remove('open');drawer.setAttribute('aria-hidden','true');modal.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll')}
    function openCart(){closeAll();overlay.classList.add('open');drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');renderCart();byId('cart-close').focus()}
    function openModal(){closeAll();overlay.classList.add('open');modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');byId('model-input').focus()}
    byId('cart-toggle').addEventListener('click',openCart);byId('nav-cart').addEventListener('click',openCart);byId('cta-contact').addEventListener('click',openCart);byId('cart-close').addEventListener('click',closeAll);byId('modal-close').addEventListener('click',closeAll);overlay.addEventListener('click',closeAll);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
    function confirmModel(){const value=byId('model-input').value.trim();if(value.length<2){byId('model-input').classList.add('invalid');byId('model-error').classList.add('show');byId('model-input').focus();return}const id=pending;pending=null;closeAll();addToCart(id,value)}byId('confirm-model').addEventListener('click',confirmModel);byId('model-input').addEventListener('keydown',e=>{if(e.key==='Enter')confirmModel()});
    function orderText(){const rows=cart.map(i=>{const p=itemById(i.id);return `• ${i.qty}x ${p.name}${i.model?' — '+i.model:''}`});return `Olá! Gostaria de consultar estes produtos da Lion Acessórios:\n\n${rows.join('\n')}\n\nPodem confirmar disponibilidade e valores?`}
    byId('whatsapp-checkout').addEventListener('click',()=>{if(!cart.length)return;const num=CONFIG.whatsappNumber.replace(/\D/g,'');const uri=(num?'https://wa.me/'+num+'?text=':'https://api.whatsapp.com/send?text=')+encodeURIComponent(orderText());const a=document.createElement('a');a.href=uri;a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove();if(!num)toast('Escolha o contato da loja no WhatsApp.')});
    byId('copy-order').addEventListener('click',async()=>{if(!cart.length)return;const txt=orderText();try{await navigator.clipboard.writeText(txt);toast('Lista copiada!')}catch{const ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.top='-9999px';document.body.appendChild(ta);ta.select();const ok=document.execCommand('copy');ta.remove();toast(ok?'Lista copiada!':'Não foi possível copiar a lista')}});
    byId('nav-home').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));byId('nav-products').addEventListener('click',()=>byId('produtos').scrollIntoView({behavior:'smooth'}));
    byId('year').textContent=new Date().getFullYear();updateCounts();renderProducts();renderCart();
  })();
  