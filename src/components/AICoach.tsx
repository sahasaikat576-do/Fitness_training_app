import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  MessageCircle, 
  Zap, 
  Target, 
  TrendingUp,
  Activity,
  Send,
  Mic,
  Camera
} from 'lucide-react';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello Saikat! I've analyzed your recent performance data. Your strength has improved 23% this month, but I notice your recovery time could be optimized. Shall we work on a personalized recovery protocol?",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'user',
      content: "Yes, I've been feeling more tired lately. What do you recommend?",
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: 3,
      type: 'ai',
      content: "Based on your biometric data, I recommend: 1) Increase sleep by 30 minutes, 2) Add 10 minutes of meditation post-workout, 3) Adjust your protein timing. I've created a custom recovery plan for you. Would you like me to activate it?",
      timestamp: new Date(Date.now() - 180000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiMetrics = [
    { label: 'Learning Accuracy', value: '97.3%', color: 'from-green-500 to-emerald-500' },
    { label: 'Prediction Success', value: '94.1%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Adaptation Rate', value: '89.7%', color: 'from-purple-500 to-pink-500' },
    { label: 'User Satisfaction', value: '96.8%', color: 'from-yellow-500 to-orange-500' }
  ];

  const aiCapabilities = [
    {
      title: 'Real-time Form Analysis',
      description: 'AI-powered computer vision analyzes your form and provides instant feedback',
      icon: Camera,
      status: 'active'
    },
    {
      title: 'Biometric Integration',
      description: 'Connects with wearables to optimize workouts based on heart rate, sleep, and stress',
      icon: Activity,
      status: 'active'
    },
    {
      title: 'Predictive Analytics',
      description: 'Predicts optimal workout times, injury risks, and performance plateaus',
      icon: TrendingUp,
      status: 'learning'
    },
    {
      title: 'Voice Commands',
      description: 'Natural language processing for hands-free workout guidance',
      icon: Mic,
      status: 'beta'
    }
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai' as const,
        content: "I understand your concern. Let me analyze your recent data and create a personalized solution. Based on your patterns, I recommend adjusting your training intensity by 15% and incorporating more recovery-focused activities. Would you like me to update your program?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AI Fitness Coach</h1>
                <p className="text-gray-300">Neural Network v3.2.1 - Personalized Training Intelligence</p>
              </div>
            </div>
            
            {/* AI Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {aiMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-300">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <motion.div
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col h-[600px]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">AI Conversation</h2>
                <div className="flex items-center space-x-2 ml-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-white/10 text-gray-100 border border-white/10'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask your AI coach anything..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <motion.button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* AI Capabilities */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="h-5 w-5 text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">AI Capabilities</h2>
            </div>
            
            <div className="space-y-4">
              {aiCapabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 text-cyan-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">{capability.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            capability.status === 'active' 
                              ? 'bg-green-500/20 text-green-300'
                              : capability.status === 'learning'
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {capability.status}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{capability.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;