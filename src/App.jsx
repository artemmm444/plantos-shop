import React, { useState, useEffect, useMemo, useRef } from 'react'
import { SHOP, CATEGORIES, PLANTS } from './catalog.js'

const RUB = (n) => n.toLocaleString('ru-RU') + ' ₽'
const catLabel = (slug) => (CATEGORIES.find((c) => c.slug === slug) || {}).label || slug

// ---- ботанические силуэты (линейная графика) ----
const LEAF_PATHS = {
  monstera: (
    <g>
      <path d="M32 60 V32" />
      <path d="M32 33 C14 33 7 18 11 7 C25 11 31 20 32 33 Z" />
      <path d="M32 33 C50 33 57 18 53 7 C39 11 33 20 32 33 Z" />
      <path d="M17 15 l5 3 M47 15 l-5 3 M15 24 l6 2 M49 24 l-6 2" />
    </g>
  ),
  fiddle: (
    <g>
      <path d="M32 60 V26" />
      <path d="M32 26 C16 24 12 10 22 5 C34 3 44 12 42 24 C41 30 37 27 32 26 Z" />
      <path d="M25 16 l7 2 M32 33 l6 -3 M32 40 l-6 -3" />
    </g>
  ),
  rosette: (
    <g>
      <path d="M32 32 L32 8 M32 32 L52 18 M32 32 L54 40 M32 32 L44 54 M32 32 L20 54 M32 32 L10 40 M32 32 L12 18" />
      <circle cx="32" cy="32" r="5" />
    </g>
  ),
  strap: (
    <g>
      <path d="M24 60 C22 40 22 22 27 6" />
      <path d="M32 60 C32 38 32 20 32 5" />
      <path d="M40 60 C42 40 42 22 37 6" />
    </g>
  ),
  palm: (
    <g>
      <path d="M32 60 V30" />
      <path d="M32 30 C22 22 12 20 6 22 M32 30 C24 18 20 10 20 6 M32 30 C40 22 50 20 58 22 M32 30 C40 18 44 10 44 6 M32 30 C30 20 30 12 32 6" />
    </g>
  ),
  round: (
    <g>
      <path d="M32 60 C30 46 34 42 34 34 M32 46 C24 44 20 48 16 50 M34 40 C42 38 46 42 50 44" />
      <circle cx="34" cy="30" r="8" />
      <circle cx="14" cy="52" r="6" />
      <circle cx="52" cy="46" r="6" />
    </g>
  ),
}

function Leaf({ name }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {LEAF_PATHS[name] || LEAF_PATHS.rosette}
    </svg>
  )
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2.4"
    strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 l5 5 L20 6" /></svg>
)

// ---- боковая панель фильтров ----
function Sidebar({ open, catCounts, active, toggleCat, difficulty, setDifficulty, query, setQuery, onReset, dirty }) {
  const diffs = ['просто', 'внимание', 'сложно']
  return (
    <aside className={'sidebar' + (open ? ' open' : '')}>
      <div className="fgroup">
        <h4>Поиск</h4>
        <input className="search-in" placeholder="название или латынь"
          value={query} onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)', background: 'var(--paper)', fontSize: 13 }} />
      </div>

      <div className="fgroup">
        <h4>Категория <em>{active.length ? active.length + ' выбр.' : 'все'}</em></h4>
        {CATEGORIES.map((c) => (
          <button key={c.slug} className={'opt' + (active.includes(c.slug) ? ' on' : '')}
            onClick={() => toggleCat(c.slug)}>
            <span>{c.label}</span>
            <span className="n">{catCounts[c.slug] || 0}</span>
          </button>
        ))}
      </div>

      <div className="fgroup">
        <h4>Уход</h4>
        {diffs.map((d) => (
          <button key={d} className={'opt' + (difficulty === d ? ' on' : '')}
            onClick={() => setDifficulty(difficulty === d ? null : d)}>
            <span style={{ textTransform: 'capitalize' }}>{d}</span>
            <span className="n">{PLANTS.filter((p) => p.difficulty === d).length}</span>
          </button>
        ))}
      </div>

      <button className="reset" onClick={onReset} disabled={!dirty}>сбросить фильтры</button>
    </aside>
  )
}

// ---- карточка товара ----
function PlantCard({ plant, inCart, onAdd, onOpen }) {
  return (
    <div className="card">
      <button className="card-figure" onClick={() => onOpen(plant)} aria-label={'Открыть ' + plant.name}>
        <Leaf name={plant.leaf} />
        <span className="difficulty-pill">{plant.difficulty}</span>
      </button>
      <div className="card-body">
        <div className="card-code">
          <span>{plant.code}</span>
          <span>{catLabel(plant.category)}</span>
        </div>
        <button onClick={() => onOpen(plant)} style={{ display: 'block', textAlign: 'left', width: '100%' }}>
          <div className="card-name">{plant.name}</div>
          <div className="card-latin">{plant.latin}</div>
        </button>
        <div className="card-foot">
          <div className="price">{RUB(plant.price)}<br /><em>{plant.height} · {plant.light}</em></div>
          <button className={'add' + (inCart ? ' added' : '')} onClick={() => onAdd(plant.id)}>
            {inCart ? 'в корзине' : '+ купить'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- модалка товара ----
function ProductModal({ plant, inCart, onAdd, onClose }) {
  return (
    <div className={'modal' + (plant ? ' show' : '')} role="dialog" aria-modal="true">
      {plant && (
        <div className="modal-grid">
          <div className="modal-fig" style={{ color: 'var(--lime)' }}><Leaf name={plant.leaf} /></div>
          <div className="modal-info">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="m-code">{plant.code} · {catLabel(plant.category)}</span>
              <button className="x" onClick={onClose} aria-label="Закрыть">✕</button>
            </div>
            <h2>{plant.name}</h2>
            <div className="m-latin">{plant.latin}</div>
            <div className="specs">
              <div className="spec"><span className="k">Свет</span><span>{plant.light}</span></div>
              <div className="spec"><span className="k">Высота</span><span>{plant.height}</span></div>
              <div className="spec"><span className="k">Полив</span><span>{plant.water}</span></div>
              <div className="spec"><span className="k">Уход</span><span style={{ textTransform: 'capitalize' }}>{plant.difficulty}</span></div>
            </div>
            <p className="m-desc">{plant.desc}</p>
            <div className="m-foot">
              <div className="price">{RUB(plant.price)}</div>
              <button className={'add' + (inCart ? ' added' : '')} onClick={() => onAdd(plant.id)}
                style={{ padding: '12px 20px' }}>
                {inCart ? 'в корзине ✓' : '+ в корзину'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ---- оформление заказа ----
const emptyForm = { name: '', phone: '', city: SHOP.city, address: '', delivery: 'Курьер', comment: '' }

function Checkout({ total, onDone, onBack }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const validate = () => {
    const er = {}
    if (form.name.trim().length < 2) er.name = 'укажите имя'
    if (!/^[+\d][\d\s()-]{9,}$/.test(form.phone.trim())) er.phone = 'телефон в формате +7 900 000-00-00'
    if (form.address.trim().length < 5) er.address = 'укажите адрес доставки'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (validate()) onDone()
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className={'field' + (errors.name ? ' err' : '')}>
        <label>Имя получателя</label>
        <input value={form.name} onChange={set('name')} placeholder="Иван Иванов" />
        <div className="msg">{errors.name}</div>
      </div>
      <div className={'field' + (errors.phone ? ' err' : '')}>
        <label>Телефон</label>
        <input value={form.phone} onChange={set('phone')} placeholder="+7 900 000-00-00" inputMode="tel" />
        <div className="msg">{errors.phone}</div>
      </div>
      <div className="two">
        <div className="field">
          <label>Город</label>
          <input value={form.city} onChange={set('city')} />
        </div>
        <div className="field">
          <label>Доставка</label>
          <select value={form.delivery} onChange={set('delivery')}>
            <option>Курьер</option>
            <option>СДЭК до пункта</option>
            <option>Самовывоз</option>
          </select>
        </div>
      </div>
      <div className={'field' + (errors.address ? ' err' : '')}>
        <label>Адрес</label>
        <input value={form.address} onChange={set('address')} placeholder="улица, дом, квартира" />
        <div className="msg">{errors.address}</div>
      </div>
      <div className="field">
        <label>Комментарий</label>
        <textarea rows="2" value={form.comment} onChange={set('comment')} placeholder="необязательно" />
      </div>

      <div className="sumline total"><span>Итого</span><span>{RUB(total)}</span></div>
      <button type="submit" className="btn-primary">оформить заказ</button>
      <button type="button" className="btn-ghost" onClick={onBack}>← назад в корзину</button>
      <p className="pay-note">Демонстрационный магазин: оплата не списывается, данные никуда не отправляются. Менеджер «связался бы» для подтверждения.</p>
    </form>
  )
}

// ---- корзина (drawer) ----
function CartDrawer({ open, items, plantsById, subtotal, onClose, onQty, onRemove }) {
  const [stage, setStage] = useState('cart') // cart | checkout | done
  const [orderId, setOrderId] = useState('')
  const shipping = subtotal > 0 && subtotal < 5000 ? 390 : 0
  const total = subtotal + shipping

  useEffect(() => { if (!open) { const t = setTimeout(() => setStage('cart'), 260); return () => clearTimeout(t) } }, [open])

  const finish = () => {
    setOrderId('PO-' + Math.floor(100000 + Math.random() * 900000))
    setStage('done')
  }

  return (
    <aside className={'drawer' + (open ? ' show' : '')} role="dialog" aria-label="Корзина">
      <div className="drawer-head">
        <b>{stage === 'checkout' ? 'ОФОРМЛЕНИЕ' : stage === 'done' ? 'ГОТОВО' : 'КОРЗИНА'}</b>
        <button className="x" onClick={onClose} aria-label="Закрыть">✕</button>
      </div>

      {stage === 'done' ? (
        <div className="drawer-body">
          <div className="ok-screen">
            <div className="ok-mark"><Check /></div>
            <h3>Заказ принят</h3>
            <div className="order-id">{orderId}</div>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>Спасибо! В реальном магазине здесь ушло бы письмо и уведомление менеджеру.</p>
            <button className="btn-primary" onClick={onClose}>продолжить</button>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="drawer-body">
          <div className="cart-empty">
            <div className="leaf-mark" style={{ color: 'var(--forest)' }}><Leaf name="round" /></div>
            <p>Корзина пуста.<br />Добавьте растение из каталога.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="drawer-body">
            {stage === 'cart' && items.map(({ id, qty }) => {
              const p = plantsById[id]
              return (
                <div className="line-item" key={id}>
                  <div className="li-fig" style={{ color: 'var(--forest)' }}><Leaf name={p.leaf} /></div>
                  <div className="li-main">
                    <div className="li-name">{p.name}</div>
                    <div className="li-code">{p.code} · {RUB(p.price)}</div>
                    <div className="qty">
                      <button onClick={() => onQty(id, qty - 1)} aria-label="меньше">−</button>
                      <span>{qty}</span>
                      <button onClick={() => onQty(id, qty + 1)} aria-label="больше">+</button>
                    </div>
                  </div>
                  <div>
                    <div className="li-price">{RUB(p.price * qty)}</div>
                    <button className="li-remove" onClick={() => onRemove(id)}>удалить</button>
                  </div>
                </div>
              )
            })}
            {stage === 'checkout' && (
              <Checkout total={total} onDone={finish} onBack={() => setStage('cart')} />
            )}
          </div>

          {stage === 'cart' && (
            <div className="drawer-foot">
              <div className="sumline"><span>Товары</span><span>{RUB(subtotal)}</span></div>
              <div className="sumline"><span>Доставка</span><span>{shipping ? RUB(shipping) : 'бесплатно'}</span></div>
              <div className="sumline total"><span>Итого</span><span>{RUB(total)}</span></div>
              <button className="btn-primary" onClick={() => setStage('checkout')}>оформить →</button>
            </div>
          )}
        </>
      )}
    </aside>
  )
}

function Toast({ show, text }) {
  return (
    <div className={'toast' + (show ? ' show' : '')}>
      <span className="tdot" />{text}
    </div>
  )
}

// ---- корень приложения ----
const CART_KEY = 'plantos_cart'

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || [] } catch { return [] }
  })
  const [activeCats, setActiveCats] = useState([])
  const [difficulty, setDifficulty] = useState(null)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('code')
  const [drawer, setDrawer] = useState(false)
  const [modal, setModal] = useState(null)
  const [menu, setMenu] = useState(false)
  const [toast, setToast] = useState({ show: false, text: '' })
  const toastTimer = useRef()

  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)) }, [cart])

  const plantsById = useMemo(() => Object.fromEntries(PLANTS.map((p) => [p.id, p])), [])

  const catCounts = useMemo(() => {
    const m = {}
    for (const p of PLANTS) m[p.category] = (m[p.category] || 0) + 1
    return m
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = PLANTS.filter((p) => {
      if (activeCats.length && !activeCats.includes(p.category)) return false
      if (difficulty && p.difficulty !== difficulty) return false
      if (q && !(p.name.toLowerCase().includes(q) || p.latin.toLowerCase().includes(q))) return false
      return true
    })
    const by = {
      code: (a, b) => a.code.localeCompare(b.code),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name, 'ru'),
    }
    return [...list].sort(by[sort])
  }, [activeCats, difficulty, query, sort])

  const cartIds = useMemo(() => new Set(cart.map((i) => i.id)), [cart])
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal = cart.reduce((s, i) => s + (plantsById[i.id]?.price || 0) * i.qty, 0)

  const flash = (text) => {
    setToast({ show: true, text })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200)
  }

  const addToCart = (id) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === id)
      if (ex) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
      return [...c, { id, qty: 1 }]
    })
    flash(plantsById[id].name + ' — в корзине')
  }
  const setQty = (id, qty) => {
    if (qty <= 0) return setCart((c) => c.filter((i) => i.id !== id))
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)))
  }
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id))

  const toggleCat = (slug) =>
    setActiveCats((a) => (a.includes(slug) ? a.filter((s) => s !== slug) : [...a, slug]))
  const resetFilters = () => { setActiveCats([]); setDifficulty(null); setQuery('') }
  const dirty = activeCats.length > 0 || difficulty !== null || query !== ''

  return (
    <>
      <header className="topbar">
        <button className="menu-btn" onClick={() => setMenu((m) => !m)}>☰ фильтр</button>
        <div className="brand">
          <b>{SHOP.name}</b>
          <span>{SHOP.tagline}</span>
        </div>
        <div className="topbar-mid">
          <span className="dot" /> <span>{SHOP.delivery}</span>
          <span className="dot" /> <span>{SHOP.city}</span>
        </div>
        <button className="cart-btn" onClick={() => setDrawer(true)}>
          <span>КОРЗИНА</span>
          <span className="cart-total">{RUB(subtotal)}</span>
          <span className="count">{cartCount}</span>
        </button>
      </header>

      <div className="shell">
        <Sidebar
          open={menu}
          catCounts={catCounts}
          active={activeCats}
          toggleCat={toggleCat}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          query={query}
          setQuery={setQuery}
          onReset={resetFilters}
          dirty={dirty}
        />

        <main className="main">
          <div className="rowbar">
            <span className="count-lbl">образцов: <b>{filtered.length}</b> / {PLANTS.length}</span>
            <div className="sortsel">
              <span>сортировка</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="code">по артикулу</option>
                <option value="price-asc">цена ↑</option>
                <option value="price-desc">цена ↓</option>
                <option value="name">название</option>
              </select>
            </div>
          </div>

          {filtered.length ? (
            <div className="grid">
              {filtered.map((p) => (
                <PlantCard key={p.id} plant={p} inCart={cartIds.has(p.id)} onAdd={addToCart} onOpen={setModal} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <b>Ничего не найдено</b>
              По заданным фильтрам образцов нет. Сбросьте фильтры и попробуйте снова.
            </div>
          )}

          <footer className="site-foot">
            <span>{SHOP.name} · {SHOP.tagline}</span>
            <span>{SHOP.phone} · {SHOP.delivery}</span>
          </footer>
        </main>
      </div>

      <div className={'overlay' + (drawer || modal || menu ? ' show' : '')}
        onClick={() => { setDrawer(false); setModal(null); setMenu(false) }} />

      <CartDrawer
        open={drawer}
        items={cart}
        plantsById={plantsById}
        subtotal={subtotal}
        onClose={() => setDrawer(false)}
        onQty={setQty}
        onRemove={removeItem}
      />

      <ProductModal
        plant={modal}
        inCart={modal ? cartIds.has(modal.id) : false}
        onAdd={(id) => { addToCart(id) }}
        onClose={() => setModal(null)}
      />

      <Toast show={toast.show} text={toast.text} />
    </>
  )
}
