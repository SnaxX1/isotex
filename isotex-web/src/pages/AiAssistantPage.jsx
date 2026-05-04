import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Sparkles, CheckCircle, RefreshCcw, Loader2, MessageSquare, Send, Bot, User as UserIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/footer';

const AiAssistantPage = () => {
  const [activeTab, setActiveTab] = useState('image');
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([{ role: 'bot', text: 'Hello! I am your ISOTEX sustainable architecture expert. How can I help you find the right material today?' }]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selected = e.dataTransfer.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError('');
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const analyzeImage = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong while analyzing the image.');
    } finally {
      setLoading(false);
    }
  };

  const formatKey = (key) => {
    if (!key) return '';
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const sendChatMessage = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const history = messages.filter(m => m.role !== 'error').map(m => ({
        role: m.role === 'bot' ? 'model' : 'user',
        text: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history })
      });

      if (!res.ok) throw new Error('Failed to fetch response');
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'error', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-10 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-[#2C3A29] mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-[#4F7C35]" />
              AI Assistant
            </h1>
            <p className="text-[#666666] max-w-xl mx-auto">
              Get personalized sustainable material recommendations. Upload a photo of your space or chat directly with our AI expert.
            </p>
          </motion.div>

          <div className="flex justify-center mb-8">
            <div className="bg-white p-1 rounded-full shadow-sm border border-[#EAE5DB] inline-flex">
              <button
                onClick={() => setActiveTab('image')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'image' ? 'bg-[#2C3A29] text-white shadow-md' : 'text-[#666666] hover:text-[#2C3A29]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Image Analysis
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'chat' ? 'bg-[#2C3A29] text-white shadow-md' : 'text-[#666666] hover:text-[#2C3A29]'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Expert Chat
              </button>
            </div>
          </div>

          {activeTab === 'image' && (
            <motion.div 
              key="image-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAE5DB]">
                <h2 className="text-xl font-bold text-[#2C3A29] mb-4">Your Space</h2>
                
                <div 
                  className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-colors ${preview ? 'border-[#4F7C35] bg-[#F9FBF8]' : 'border-[#D1D1D1] hover:border-[#4F7C35] hover:bg-gray-50'}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => !preview && fileInputRef.current?.click()}
                >
                  {preview ? (
                    <div className="relative w-full h-full p-2 group">
                      <img src={preview} alt="Space preview" className="w-full h-full object-cover rounded-lg" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); setPreview(null); setFile(null); setResult(null); }}
                        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <RefreshCcw size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-[#A69F92] mb-3" />
                      <p className="text-[#444444] font-medium">Click to upload or drag and drop</p>
                      <p className="text-[#888888] text-sm mt-1">SVG, PNG, JPG or WEBP (max. 5MB)</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>

                {preview && !result && (
                  <button
                    onClick={analyzeImage}
                    disabled={loading}
                    className="w-full mt-6 bg-[#2C3A29] hover:bg-[#1e271c] text-white py-3 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing your space...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Analyze & Recommend
                      </>
                    )}
                  </button>
                )}
                {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAE5DB] flex flex-col">
                <h2 className="text-xl font-bold text-[#2C3A29] mb-4">AI Recommendation</h2>
                
                {!result ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-[#888888] py-12">
                    <ImageIcon className="w-16 h-16 text-[#EAE5DB] mb-4" />
                    <p>Upload an image to see recommendations</p>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-grow flex flex-col space-y-5"
                  >
                    <div className="bg-[#F9FBF8] border border-[#E4EEDF] rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-[#4F7C35] shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold text-[#2C3A29] text-lg">Perfect Match</h3>
                          <p className="text-[#444444] mt-1">{result.reason}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-[#888888] uppercase tracking-wider font-bold mb-1">Product Form</p>
                        <p className="text-[#2C3A29] font-medium capitalize">{formatKey(result.recommendation?.product_form)}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-[#888888] uppercase tracking-wider font-bold mb-1">Category</p>
                        <p className="text-[#2C3A29] font-medium capitalize">{formatKey(result.recommendation?.category)}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-[#888888] uppercase tracking-wider font-bold mb-1">Key Function</p>
                        <p className="text-[#2C3A29] font-medium capitalize">{formatKey(result.recommendation?.function)}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-[#888888] uppercase tracking-wider font-bold mb-1">Visual Style</p>
                        <p className="text-[#2C3A29] font-medium capitalize">{formatKey(result.recommendation?.visual_style)}</p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm font-bold text-[#2C3A29] mb-2 border-b border-[#EAE5DB] pb-2">Space Analysis</p>
                      <ul className="text-sm text-[#666666] space-y-2">
                        <li><span className="font-medium text-[#444444]">Environment:</span> <span className="capitalize">{result.space?.environment}</span></li>
                        <li><span className="font-medium text-[#444444]">Type:</span> <span className="capitalize">{result.space?.type}</span></li>
                        <li><span className="font-medium text-[#444444]">Design Style:</span> <span className="capitalize">{result.style}</span></li>
                        <li>
                          <span className="font-medium text-[#444444]">Colors Detected:</span> 
                          <div className="flex gap-2 mt-1">
                            {result.colors?.map((c, i) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-200 rounded-full text-xs capitalize">{c}</span>
                            ))}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div 
              key="chat-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-[#EAE5DB] overflow-hidden flex flex-col h-[600px] max-w-3xl mx-auto"
            >
              <div className="bg-[#2C3A29] text-white p-4 flex items-center gap-3">
                <div className="bg-[#4F7C35] p-2 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">ISOTEX Expert</h3>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest">Always Online</p>
                </div>
              </div>

              <div className="flex-grow p-6 overflow-y-auto bg-[#F9FBF8] space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 flex gap-3 ${
                      msg.role === 'user' 
                        ? 'bg-[#E4EEDF] text-[#2C3A29] rounded-tr-sm' 
                        : msg.role === 'error'
                        ? 'bg-red-50 text-red-600 rounded-tl-sm border border-red-100'
                        : 'bg-white border border-[#EAE5DB] text-[#444444] rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.role === 'bot' && <Bot className="w-5 h-5 text-[#4F7C35] shrink-0 mt-0.5" />}
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#EAE5DB] rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-[#4F7C35] animate-spin" />
                      <span className="text-sm text-[#888888]">Typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-white border-t border-[#EAE5DB]">
                <form onSubmit={sendChatMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about sustainable materials..."
                    className="flex-grow bg-[#F5F5F5] border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-[#4F7C35] outline-none text-[#2C3A29]"
                    disabled={chatLoading}
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || chatLoading}
                    className="bg-[#2C3A29] hover:bg-[#1e271c] text-white p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AiAssistantPage;
