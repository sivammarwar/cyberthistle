"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck, ChevronDown, ChevronLeft, ChevronRight, CircleDot, Globe2, Linkedin, Menu, Search, ShieldCheck, X } from "lucide-react";

const services = [
  ["Threat Intelligence", "Continuous intelligence that reveals emerging threats, exposed assets and attacker activity before they become business-impacting incidents.", "Real-time monitoring · IOC analysis · Dark web monitoring · Threat briefings"],
  ["Managed Detection & Response", "Around-the-clock monitoring, investigation and containment delivered by analysts who know when an alert requires decisive action.", "24/7 SOC monitoring · Forensics · Threat hunting · Guided response"],
  ["Security Consulting", "Senior security guidance that aligns architecture, compliance and cyber risk with the way your organisation actually operates.", "Risk assessments · Compliance · Security strategy · Training"],
  ["Security Awareness Training", "Human-centred training that helps teams recognise real-world threats, respond safely and strengthen security across the organisation.", "Phishing simulations · Workshops · Role-based learning · Compliance"],
];
const products = [
  { name:"ThistleGuard Enterprise", type:"Endpoint Protection", trial:true, copy:"Advanced endpoint detection and response platform with AI-powered threat analysis.", features:["Real-time threat detection","Behavioral analysis","Automatic response","Zero-day protection","Cloud-native architecture"], specs:[["Deployment","Cloud, On-premise, Hybrid"],["Platforms","Windows, macOS, Linux"],["API Integration","REST API, SIEM connectors"],["Compliance","SOC 2, ISO 27001, GDPR"]] },
  { name:"ThistleAI Threat Hunter", type:"Threat Intelligence", trial:true, copy:"Machine learning-powered threat hunting platform that identifies advanced persistent threats.", features:["ML-based threat detection","Behavioral analytics","Threat actor attribution","IOC enrichment","Custom rule engine"], specs:[["Data Sources","Network, Endpoint, Cloud logs"],["ML Models","Proprietary algorithms"],["Integration","SIEM, SOAR platforms"],["Scalability","Enterprise-grade"]] },
  { name:"ThistleNet Analyzer", type:"Network Security", trial:false, copy:"Deep packet inspection and network traffic analysis for comprehensive visibility.", features:["Deep packet inspection","Traffic flow analysis","Anomaly detection","Protocol analysis","Forensic capabilities"], specs:[["Throughput","Up to 100 Gbps"],["Protocols","All major protocols"],["Storage","Long-term forensic storage"],["Alerts","Real-time notifications"]] },
  { name:"ThistleResponse Orchestrator", type:"Incident Response", trial:true, copy:"Automated incident response and security orchestration platform.", features:["Automated workflows","Playbook management","Multi-tool integration","Case management","Compliance reporting"], specs:[["Integrations","200+ security tools"],["Automation","Custom workflows"],["Reporting","Executive dashboards"],["Deployment","Cloud or on-premise"]] },
];
const heroSlides = [
  { kicker: "POST-QUANTUM READINESS", title: "Protect today. Prepare for quantum.", copy: "See exactly where cryptographic risk lives across your organisation—and what to do next.", action: "Start your readiness assessment", label: "01 / DISCOVER", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=76" },
  { kicker: "CRYPTOGRAPHIC DISCOVERY", title: "Know where your encryption lives.", copy: "Create a defensible inventory of keys, certificates and high-value data across every critical system.", action: "Map your cryptography", label: "02 / MAP", image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1600&q=76" },
  { kicker: "QUANTUM-SAFE MIGRATION", title: "Modernise without disrupting momentum.", copy: "Turn discovery into a practical migration roadmap that fits your technology, budget and deadlines.", action: "Build a migration plan", label: "03 / MIGRATE", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=76" },
  { kicker: "CONTINUOUS ASSURANCE", title: "Keep confidence as threats evolve.", copy: "Maintain continuous visibility as algorithms, regulations and your infrastructure change.", action: "Explore continuous assurance", label: "04 / ASSURE", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=76" },
  { kicker: "HIGH-ASSURANCE SECURITY", title: "Security built for the systems that matter most.", copy: "Expert guidance for banks, startups and critical businesses entering the post-quantum era.", action: "Talk to a security expert", label: "05 / ACT", image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1600&q=76" },
];

function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => { const c = ref.current; if (!c) return; const ctx = c.getContext("2d"); if (!ctx) return; let raf = 0; let w = 0, h = 0; const pts = Array.from({length: 74}, () => ({ x: Math.random(), y: Math.random(), vx:(Math.random()-.5)*.00022, vy:(Math.random()-.5)*.00022, r: Math.random()*1.8+.5 })); const resize = () => { w = c.width = c.offsetWidth * devicePixelRatio; h = c.height = c.offsetHeight * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio); w = c.offsetWidth; h = c.offsetHeight; }; const draw = () => { ctx.clearRect(0,0,w,h); pts.forEach(p => { p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>1)p.vx*=-1;if(p.y<0||p.y>1)p.vy*=-1; }); for(let i=0;i<pts.length;i++){ for(let j=i+1;j<pts.length;j++){ const a=pts[i],b=pts[j], dx=(a.x-b.x)*w,dy=(a.y-b.y)*h,d=Math.hypot(dx,dy); if(d<145){ctx.strokeStyle=`rgba(178,99,255,${.19*(1-d/145)})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x*w,a.y*h);ctx.lineTo(b.x*w,b.y*h);ctx.stroke();} } } pts.forEach(p=>{ctx.fillStyle="rgba(229,205,255,.92)";ctx.beginPath();ctx.arc(p.x*w,p.y*h,p.r,0,Math.PI*2);ctx.fill();}); raf=requestAnimationFrame(draw); }; resize(); draw(); addEventListener("resize",resize); return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize)}; },[]); return <canvas ref={ref} className="particle-field" aria-hidden />;
}
function SectionTitle({ eyebrow, title, copy }: {eyebrow:string;title:string;copy?:string}) { return <div className="section-title"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="lede">{copy}</p>}</div> }
function HeroCarousel() {
 const [active,setActive]=useState(0), [paused,setPaused]=useState(false), [reduced,setReduced]=useState(false), touchX=useRef<number|null>(null);
 useEffect(()=>{heroSlides.forEach(slide=>{const image=new Image();image.decoding="async";image.src=slide.image;});},[]);
 useEffect(()=>{const query=matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReduced(query.matches);update();query.addEventListener("change",update);return()=>query.removeEventListener("change",update)},[]);
 useEffect(()=>{if(paused||reduced)return;const timer=setInterval(()=>setActive(i=>(i+1)%heroSlides.length),5000);return()=>clearInterval(timer)},[paused,reduced]);
 const move=(step:number)=>setActive(i=>(i+step+heroSlides.length)%heroSlides.length);
 return <div className="hero-carousel hero-stage" aria-roledescription="carousel" aria-label="Post-quantum security capabilities" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onTouchStart={e=>touchX.current=e.touches[0].clientX} onTouchEnd={e=>{if(touchX.current===null)return;const distance=e.changedTouches[0].clientX-touchX.current;if(Math.abs(distance)>45)move(distance>0?-1:1);touchX.current=null}}>
   <AnimatePresence>{heroSlides.filter((_,index)=>index===active).map(slide=><motion.div key={slide.title} className="hero-stage-slide" initial={{opacity:0,x:30,scale:.994}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,x:-18,scale:.998}} transition={{duration:reduced?0:.72,ease:[.22,1,.36,1]}}><div className="hero-stage-copy"><p className="eyebrow live">{slide.kicker}</p><p className="slide-count">{slide.label}</p><h1>{slide.title}</h1><p>{slide.copy}</p><a href="#contact" className="stage-action">{slide.action} <ArrowRight size={18}/></a></div><article className="hero-stage-visual" style={{backgroundImage:`linear-gradient(110deg, rgba(11,7,18,.22), rgba(11,7,18,.02)), url(${slide.image})`}}><div className="visual-hud"><span>CYBER THISTLE / QUANT COMMAND</span><b>LIVE</b></div><div className="visual-caption"><span>{slide.kicker}</span><strong>Quantum-ready security<br/>for what comes next.</strong></div></article></motion.div>)}</AnimatePresence>
   <div className="stage-controls"><button onClick={()=>move(-1)} aria-label="Previous slide"><ChevronLeft size={23}/></button><div className="carousel-dots">{heroSlides.map((slide,index)=><button key={slide.title} onClick={()=>setActive(index)} aria-label={`Go to slide ${index+1}`} className={index===active?"active":""}/>)}</div><button onClick={()=>move(1)} aria-label="Next slide"><ChevronRight size={23}/></button></div>
 </div>
}
export default function Home() {
 const [menu,setMenu]=useState<string|null>(null),[mobile,setMobile]=useState(false),[cookies,setCookies]=useState(true),[showCookieDetails,setShowCookieDetails]=useState(false),[cookieChoices,setCookieChoices]=useState({preferences:true,statistics:true,marketing:false}),[activeTab,setActiveTab]=useState<"waitlist"|"contact">("waitlist"); const menus:Record<string,{name:string;detail:string}[]>={Solutions:[{name:"Post-quantum readiness",detail:"Discover where cryptographic risk lives."},{name:"Threat intelligence",detail:"Stay ahead of emerging attack patterns."},{name:"Managed detection & response",detail:"24/7 expert monitoring and action."},{name:"Incident response",detail:"Move fast when every minute matters."},{name:"Security consulting",detail:"Practical strategy for complex environments."}],Products:[{name:"ThistleGuard Enterprise",detail:"Endpoint protection with intelligent response."},{name:"ThistleAI Threat Hunter",detail:"Machine learning-led threat hunting."},{name:"ThistleNet Analyzer",detail:"Deep network visibility at scale."},{name:"ThistleResponse Orchestrator",detail:"Automated incident coordination."}],Company:[{name:"About CyberThistle",detail:"Why we exist and where we're going."},{name:"How we work",detail:"The principles that guide every decision."},{name:"Contact us",detail:"Talk through your environment with an expert."},{name:"Join the waitlist",detail:"Get early access to quantum-readiness insights."}]};
 return <main>
  <header className="header">
    <a className="brand" href="#top">
      <img className="brand-mark" src="/cyberthistle-shield.png" alt="CyberThistle shield"/>
      <div>CYBER THISTLE<small>SECURE SOLUTIONS · SEAMLESS EXPERIENCES</small></div>
    </a>
    <nav className="desktop-nav">
      {Object.keys(menus).map(item=><div key={item} onMouseEnter={()=>setMenu(item)}><button className={menu===item?"nav-active":""} aria-expanded={menu===item} onClick={()=>setMenu(menu===item?null:item)}>{item}<ChevronDown size={14}/></button></div>)}
      <a href="#contact">Insights</a>
    </nav>
    <div className="header-actions">
      <button className="icon"><Search size={18}/></button>
      <button className="language"><Globe2 size={16}/> EN</button>
      <a className="button small" href="#contact">Get started <ArrowRight size={15}/></a>
      <button className="mobile-toggle" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
    </div>
    <AnimatePresence>
      {menu&&<motion.div className="mega-wide" onMouseLeave={()=>setMenu(null)} initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.24,ease:[.22,1,.36,1]}}>
        <div className="mega-wide-inner">
          <div className="mega-intro">
            <p>{menu.toUpperCase()} / CYBER THISTLE</p>
            <h2>{menu==="Solutions"?"Security designed for the next threat.":menu==="Products"?"Intelligence engineered to act.":"The people and principles behind the protection."}</h2>
            <a href={menu==="Products"?"#products":menu==="Company"?"#about":"#services"}>Explore {menu.toLowerCase()} <ArrowRight size={17}/></a>
          </div>
          <div className="mega-links">
            {menus[menu].map((entry,i)=><a href={entry.name.includes("waitlist")?"#contact":menu==="Products"?"#products":menu==="Company"?"#about":"#services"} key={entry.name} onClick={()=>setMenu(null)}><span>0{i+1}</span><div><b>{entry.name}</b><small>{entry.detail}</small></div><ChevronRight size={17}/></a>)}
          </div>
          <div className="mega-status">
            <span>CYBER THISTLE / SECURITY SIGNAL</span>
            <b>QUANTUM-READY<br/>STARTS WITH<br/>CLARITY.</b>
          </div>
        </div>
      </motion.div>}
    </AnimatePresence>
  </header>
  <AnimatePresence>
    {mobile&&<motion.nav initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="mobile-nav">{["About","Our Services","Our Products","Cyber Thistle Guard","Contact Us"].map(x=><a href={x.includes("Services")?"#services":x.includes("Products")?"#products":"#contact"} key={x} onClick={()=>setMobile(false)}>{x}</a>)}</motion.nav>}
  </AnimatePresence>
  <section className="hero" id="top">
    <ParticleField/>
    <div className="grid-glow"/>
    <HeroCarousel/>
  </section>
  <div className="hero-ticker" aria-label="Join the waitlist">
    <div className="hero-ticker-track">{[0,1,2].map(groupIndex=><div className="hero-ticker-group" aria-hidden={groupIndex>0} key={groupIndex}><span>JOIN THE WAITLIST. LEAD THE MOVE TO QUANTUM-READY SECURITY.</span><span>PROTECT THE SYSTEMS YOUR FUTURE DEPENDS ON.</span></div>)}</div>
  </div>
  <section className="metrics">
    <div><b>500<span>+</span></b><p>Clients protected</p></div>
    <div><b>99.9<span>%</span></b><p>Uptime SLA</p></div>
    <div><b>24<span>/7</span></b><p>Security monitoring</p></div>
    <div><b>&lt;15<span>min</span></b><p>Critical response</p></div>
  </section>
  <section className="partners">
    <span>TRUSTED BY INDUSTRY LEADERS</span>
    <div className="partner-ticker" aria-label="Partner logos">
      <div className="partner-ticker-track">
        {[0,1,2].map(groupIndex=><div className="partner-ticker-group" aria-hidden={groupIndex>0} key={groupIndex}>
          <div className="partner-item">
            <img src="/google-logo.png" alt="Google"/>
            <span>Google</span>
          </div>
          <div className="partner-item">
            <img src="/microsoft-logo.png" alt="Microsoft"/>
            <span>Microsoft</span>
          </div>
          <div className="partner-item">
            <img src="/barclays-logo.png" alt="Barclays"/>
            <span>Barclays</span>
          </div>
          <div className="partner-item">
            <img src="/rbs-logo.png" alt="Royal Bank of Scotland"/>
            <span>Royal Bank of Scotland</span>
          </div>
          <div className="partner-item">
            <img src="/strath-inspire-logo.png" alt="Strath Inspire"/>
            <span>Strath Inspire</span>
          </div>
        </div>)}
      </div>
    </div>
    <div className="partner-grid-mobile">
      <div className="partner-item-mobile">
        <img src="/google-logo.png" alt="Google"/>
        <span>Google</span>
      </div>
      <div className="partner-item-mobile">
        <img src="/microsoft-logo.png" alt="Microsoft"/>
        <span>Microsoft</span>
      </div>
      <div className="partner-item-mobile">
        <img src="/barclays-logo.png" alt="Barclays"/>
        <span>Barclays</span>
      </div>
      <div className="partner-item-mobile">
        <img src="/rbs-logo.png" alt="Royal Bank of Scotland"/>
        <span>RBS</span>
      </div>
      <div className="partner-item-mobile">
        <img src="/strath-inspire-logo.png" alt="Strath Inspire"/>
        <span>Strath Inspire</span>
      </div>
    </div>
  </section>
  <section className="section about" id="about">
    <div className="about-layout">
      <div>
        <SectionTitle eyebrow="01 / WHO WE ARE" title="Quantum-ready security, made practical." copy="CyberThistle drives cybersecurity innovation, delivering secure, seamless solutions. We protect vulnerable groups and businesses with advanced behavioral biometrics and next-generation security, making digital safety simple and trusted."/>
        <div className="mission-grid">
          <article><span className="eyebrow">OUR MISSION</span><h3>Protect today. Prepare for what's next.</h3><p>To provide world-class cybersecurity solutions that protect organizations from evolving digital threats while enabling secure business growth and innovation.</p></article>
          <article><span className="eyebrow">OUR VISION</span><h3>Make lasting security the standard.</h3><p>To be the most trusted cybersecurity partner globally, setting new standards for threat prevention and digital security excellence.</p></article>
        </div>
      </div>
      <div className="values">
        <span className="eyebrow">HOW WE WORK</span>
        {["Security without compromise","Practical excellence","One team with our clients","Clarity over complexity","Evidence-led decisions"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}
      </div>
    </div>
  </section>
  <section className="section dark-section" id="services">
    <SectionTitle eyebrow="02 / SERVICES" title="A sharper security edge." copy="Specialist teams and practical intelligence, designed around your operating reality."/>
    <div className="service-grid">{services.map(([name,copy,detail],i)=><motion.article whileHover={{y:-6}} key={name} className="service"><span>0{i+1}</span><h3>{name}</h3><p>{copy}</p><small>{detail}</small><a href="#contact">Explore service <ArrowRight size={15}/></a></motion.article>)}</div>
  </section>
  <section className="section products" id="products">
    <SectionTitle eyebrow="03 / PRODUCTS" title="Intelligence, engineered to act." copy="Cybersecurity platforms built for modern threats—and the teams responding to them."/>
    <div className="product-grid">{products.map(product=><article key={product.name} className="product-card" tabIndex={0}><div className="product-summary"><div><span className="eyebrow">{product.type}</span>{product.trial&&<span className="trial">FREE TRIAL</span>}</div><h3>{product.name}</h3><p>{product.copy}</p><div className="product-prompt">Explore capabilities <ArrowRight size={17}/></div></div><div className="product-detail"><div className="product-detail-head"><span>{product.type}</span><b>{product.name}</b></div><div className="product-detail-grid"><div><h4>Key features</h4><ul>{product.features.map(feature=><li key={feature}><ShieldCheck size={14}/>{feature}</li>)}</ul></div><div><h4>Technical specifications</h4><dl>{product.specs.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></div><div className="product-actions">{product.trial&&<a href="#contact">Start free trial <ArrowRight size={15}/></a>}<a href="#contact">Contact us <ArrowRight size={15}/></a></div></div></article>)}</div>
    <div className="coming">
      <div><p className="eyebrow">ON THE HORIZON</p><h3>Full IP ownership. New layers of confidence.</h3></div>
      <p>Zero trust with AI-driven verification and behavioral biometric authentication. Our next-generation security framework validates every access request in real-time, combining machine learning threat detection with continuous identity verification to protect your most critical assets without compromising user experience.</p>
    </div>
  </section>
  {/* <section className="section leadership"><SectionTitle eyebrow="04 / LEADERSHIP" title="Built by people who know the stakes." copy="A multidisciplinary team building practical security for the post-quantum era."/><div className="people">{[["Anisha Fernandes","Founder & Chief Security Officer","https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=85","Anisha leads CyberThistle's security strategy, translating emerging cryptographic risks into clear decisions for high-growth teams.","Quantum strategy · Risk governance"],["Andy Jenkinson","Chief Technology Officer","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85","Andy architects resilient platforms and pragmatic migration paths for organisations managing complex digital estates.","Security architecture · Platform resilience"],["Neha Garg","Head of Offensive Security","https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=85","Neha leads adversarial testing that exposes the gaps between assumed protection and real-world resilience.","Red teaming · Cryptographic testing"],["John Lau","Director of Security Operations","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=85","John turns intelligence into coordinated operations, helping teams respond with confidence when the pressure is highest.","24/7 operations · Incident command"]].map(([name,role,img,bio,focus])=><article key={name} className="leader-card" tabIndex={0}><div className="portrait" style={{backgroundImage:`url(${img})`}}/><div className="leader-initial"><p>{role}</p><h3>{name}</h3><span>Meet the team <ArrowRight size={15}/></span></div><div className="leader-overlay"><p className="eyebrow">{role}</p><h3>{name}</h3><p>{bio}</p><small>{focus}</small><a href="#contact" aria-label={`Connect with ${name}`}>Connect <Linkedin size={16}/></a></div></article>)}</div></section> */}
  <section className="waitlist" id="contact">
    <div className="waitlist-tabs">
      <button className={activeTab==="waitlist"?"active":""} onClick={()=>setActiveTab("waitlist")}>Join the waitlist</button>
      <button className={activeTab==="contact"?"active":""} onClick={()=>setActiveTab("contact")}>Contact Us</button>
    </div>
    <div className="waitlist-grid">
      {(activeTab==="waitlist") ? (<>
        <div className="waitlist-copy">
          <p className="eyebrow live">04 / EARLY ACCESS / QUANTUM READINESS</p>
          <p className="waitlist-index">THE NEXT SECURITY STANDARD</p>
          <h2>Be ready before<br/><span style={{color:"var(--violet2)"}}>the threat arrives.</span></h2>
          <p>Join our waitlist for early access to our post-quantum readiness programme, practical research and priority assessment slots.</p>
          <div className="waitlist-signals">
            <span><BadgeCheck/> Built for high-assurance teams</span>
            <span><BadgeCheck/> No noise. Only practical intelligence.</span>
          </div>
        </div>
        <form className="waitlist-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="form-status"><span>WAITLIST ACCESS</span><b>Limited cohort / 2026</b></div>
          <h3>Secure your place.</h3>
          <p>Tell us where you are today. We'll send the right next step—not a generic sales sequence.</p>
          <label>WORK EMAIL<input required type="email" placeholder="you@company.com"/></label>
          <label>YOUR ORGANISATION<select defaultValue=""><option value="" disabled>Select your organisation type</option><option>Banking & financial services</option><option>Startup / technology company</option><option>Enterprise organisation</option><option>Public sector / critical infrastructure</option></select></label>
          <button className="waitlist-button" type="submit">Join the waitlist <ArrowRight size={18}/></button>
          <small>By joining, you agree to receive early-access updates. Unsubscribe anytime.</small>
        </form>
      </>) : (<>
        <div className="waitlist-copy">
          <p className="eyebrow live">04 / CONTACT US</p>
          <p className="waitlist-index">GET IN TOUCH</p>
          <h2>Let's talk<br/><span style={{color:"var(--violet2)"}}>security.</span></h2>
          <p>Have questions about our cybersecurity solutions? Our team is ready to help you protect what matters most.</p>
          <div className="waitlist-signals">
            <span><BadgeCheck/> Expert consultation</span>
            <span><BadgeCheck/> Tailored solutions</span>
          </div>
        </div>
        <form className="waitlist-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="form-status"><span>CONTACT FORM</span><b>We'll respond within 24 hours</b></div>
          <h3>Send us a message.</h3>
          <p>Tell us about your security needs and we'll provide customized recommendations.</p>
          <label>NAME<input required type="text" placeholder="Your name"/></label>
          <label>WORK EMAIL<input required type="email" placeholder="you@company.com"/></label>
          <label>MESSAGE<textarea required placeholder="Tell us about your security needs..." rows={4}/></label>
          <button className="waitlist-button" type="submit">Send message <ArrowRight size={18}/></button>
          <small>By submitting this form, you agree to our privacy policy.</small>
        </form>
      </>)}
    </div>
    <div className="waitlist-rail" aria-label="Capabilities">
      <div className="waitlist-ticker">{[0,1,2].map(groupIndex=><div className="ticker-group" aria-hidden={groupIndex>0} key={groupIndex}>{["POST-QUANTUM READINESS","CRYPTOGRAPHIC DISCOVERY","QUANTUM-SAFE MIGRATION","CONTINUOUS ASSURANCE"].map(item=><span key={item}>{item}</span>)}</div>)}</div>
    </div>
  </section>
  <section className="trust">
    <span>BUILT FOR HIGH-ASSURANCE ENVIRONMENTS</span>
    <div><b>Cyber Essentials Plus</b><b>B Corp</b><b>ISO 27001</b><b>SOC 2 Type II</b></div>
  </section>
  <footer className="footer">
    <div className="footer-brand">
      <a className="brand" href="#top">
        <img className="brand-mark" src="/cyberthistle-shield.png" alt="CyberThistle shield"/>
        <div>CYBER THISTLE<small>SECURE SOLUTIONS · SEAMLESS EXPERIENCES</small></div>
      </a>
      <p className="footer-company-copy">Leading cybersecurity solutions provider, protecting organizations worldwide with cutting-edge threat detection and response capabilities.</p>
      <div className="footer-contact-details">
        <span>Graham Hills Building (Level 6), 50 Richmond Street, Glasgow, G1 1XP</span>
        <a href="tel:+447341626828">+44 7341 626828</a>
        <a href="mailto:contact@cyberthistle.com">contact@cyberthistle.com</a>
      </div>
      <div className="certifications">
        <span>Cyber Essentials Plus</span>
        <span>B Corp</span>
        <span>ISO 27001</span>
        <span>SOC 2 Type II</span>
      </div>
    </div>
    <div className="footer-about">
      <b>ABOUT US</b>
      <p>Security expertise for businesses navigating the next era of cryptography.</p>
      <a href="#about">Learn more</a>
    </div>
    <div>
      <b>QUICK LINKS</b>
      {["Contact us","Privacy policy","Terms of service","Cookie policy","Insights"].map(x=><a href={x==="Contact us"?"#contact":"#"} key={x}>{x}</a>)}
    </div>
    <div>
      <b>STAY INFORMED</b>
      <p>Field notes, threat intelligence and practical perspective.</p>
      <div className="subscribe">
        <input aria-label="Email address" placeholder="Email address"/>
        <button><ArrowRight size={16}/></button>
      </div>
    </div>
    <small className="copyright">© 2026 Cyber Thistle. All rights reserved.</small>
  </footer>
  <AnimatePresence>
    {cookies&&<motion.aside className="cookie-banner" initial={{y:26,opacity:0}} animate={{y:0,opacity:1}} exit={{y:26,opacity:0}} transition={{duration:.35}}>
      <div className="cookie-top">
        <div className="cookie-copy">
          <b>This website uses cookies</b>
          <p>We use cookies to personalise content and ads, provide social media features and analyse our traffic. We may share information about your use of this site with our social media, advertising and analytics partners. You consent to our cookies if you continue to use our website.</p>
        </div>
        <button className="cookie-accept" onClick={()=>setCookies(false)}>OK</button>
      </div>
      <div className="cookie-bottom">
        <div className="cookie-mark"><img src="/cyberthistle-shield.png" alt="CyberThistle shield"/></div>
        <div className="cookie-options">
          <span>Necessary <i className="on"/></span>
          {(["preferences","statistics","marketing"] as const).map(choice=><label key={choice}>{choice[0].toUpperCase()+choice.slice(1)} <button className={cookieChoices[choice]?"on":""} onClick={()=>setCookieChoices(current=>({...current,[choice]:!current[choice]}))} aria-label={`Toggle ${choice} cookies`} aria-pressed={cookieChoices[choice]}/></label>)}
        </div>
        <button className="cookie-settings" onClick={()=>setShowCookieDetails(!showCookieDetails)}>{showCookieDetails?"Hide details":"Show details"} <ChevronRight size={18}/></button>
      </div>
      {showCookieDetails&&<div className="cookie-details">Essential cookies keep the site secure. You can turn preference, statistics and marketing cookies on or off using the switches above.</div>}
    </motion.aside>}
  </AnimatePresence>
 </main>
}