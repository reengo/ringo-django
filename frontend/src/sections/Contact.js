import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';

function Contact({ CONFIG }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send(CONFIG.emailJS.serviceId, CONFIG.emailJS.templateId, form, { publicKey: CONFIG.emailJS.publicKey });
      toast.success("Message sent! I'll be in touch soon.", { position: 'bottom-right' });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const detail = err?.text || err?.message || JSON.stringify(err);
      console.error("EmailJS error:", err);
      toast.error(`Failed to send: ${detail}`, { position: 'bottom-right' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <span className="mb-4 block text-base font-semibold text-orange-500">
        Contact Me
      </span>
      <h2 className="mb-6 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px]">
        SEND ME A MESSAGE
      </h2>
      <p className="mb-9 text-base leading-relaxed">
        Available for CTO consulting, technical advisory, and senior engineering roles. Based in the Philippines, working with teams globally. Whether you have a project, a question, or just want to connect — I'd love to hear from you.
      </p>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="p-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        <input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="p-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        <textarea placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="p-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-32" />
        <button type="submit" className="bg-[var(--primary)] text-white rounded-xl py-3 hover:bg-[var(--accent)]">Send</button>
      </form>
    </div>
  );
}

export default Contact;
