import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/app/context/AppContext';
import { JDVersion } from '@/app/types';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { Bot, Send, Check, Edit, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

interface JDOption {
  version: JDVersion;
  content: string;
  description: string;
}

type ChatStage = 'initial' | 'gathering' | 'generating' | 'selecting' | 'editing' | 'publishing' | 'published';

export const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const { createJob, updateJob } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState<ChatStage>('initial');
  const [userRequirements, setUserRequirements] = useState('');
  const [jdOptions, setJDOptions] = useState<JDOption[]>([]);
  const [selectedJD, setSelectedJD] = useState<JDOption | null>(null);
  const [editedJD, setEditedJD] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    addBotMessage(
      "Hi! I'm Rex, your AI hiring assistant. 🤖\n\nI'm here to help you create a job posting. Tell me about the role you're hiring for - include details like:\n\n• Job title and level\n• Required skills and experience\n• Location and work mode\n• Key responsibilities\n• Any other important requirements\n\nThe more details you provide, the better I can help!"
    );
    setStage('gathering');
  }, []);

  const addBotMessage = (content: string, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const parseRequirements = (requirements: string) => {
    // Simple parsing - extract key information
    const lines = requirements.toLowerCase();
    
    // Try to extract job title
    const titleMatch = requirements.match(/(?:role|position|title|hiring for)[\s:]+([^\n.]+)/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Software Engineer';
    
    // Extract skills
    const skillsMatch = requirements.match(/(?:skills?|technologies?|tech stack)[\s:]+([^\n]+)/i);
    const skills = skillsMatch 
      ? skillsMatch[1].split(/[,&]+/).map(s => s.trim()).filter(s => s.length > 0)
      : ['React', 'JavaScript', 'Node.js'];
    
    // Determine location
    const locationMatch = requirements.match(/(?:location|based in|from)[\s:]+([^\n.]+)/i);
    const location = locationMatch ? locationMatch[1].trim() : 'Bangalore';
    
    // Determine work mode
    const workMode = lines.includes('remote') ? 'Remote' : 
                     lines.includes('hybrid') ? 'Hybrid' : 'On-site';
    
    // Experience
    const expMatch = requirements.match(/(\d+)[\s-]+(?:to|-)[\s]*(\d+)[\s]*years?/i);
    const experienceRange = expMatch 
      ? { min: parseInt(expMatch[1]), max: parseInt(expMatch[2]) }
      : { min: 2, max: 5 };
    
    return {
      title,
      skills,
      location,
      workMode,
      experienceRange,
      fullRequirements: requirements
    };
  };

  const generateJDs = (requirements: string) => {
    const parsed = parseRequirements(requirements);
    
    const jds: JDOption[] = [
      {
        version: 'Formal',
        description: 'Traditional corporate style - Professional and detailed',
        content: `${parsed.title}

Location: ${parsed.location} (${parsed.workMode})
Experience: ${parsed.experienceRange.min}-${parsed.experienceRange.max} years

Position Overview:
We are seeking a highly skilled ${parsed.title} to join our organization. The successful candidate will be responsible for contributing to our team's objectives and demonstrating expertise in their field.

Key Responsibilities:
• Develop and maintain high-quality software solutions
• Collaborate with cross-functional teams to define and implement features
• Participate in code reviews and contribute to technical documentation
• Ensure best practices in software development

Required Qualifications:
${parsed.skills.map(s => `• ${s}`).join('\n')}
• ${parsed.experienceRange.min}+ years of relevant experience
• Strong problem-solving and analytical skills
• Excellent communication abilities

We offer competitive compensation and a comprehensive benefits package.`
      },
      {
        version: 'Startup',
        description: 'Modern and energetic - Perfect for fast-paced environments',
        content: `🚀 ${parsed.title}

We're building something amazing, and we need you!

If you love ${parsed.skills[0]?.toLowerCase() || 'technology'} and want to make a real impact, this is your chance to join a fast-growing team.

What you'll do:
• Build and ship features that users love
• Work directly with founders and key stakeholders
• Own your projects from concept to launch
• Help shape our product and engineering culture

What we're looking for:
${parsed.skills.map(s => `✓ ${s}`).join('\n')}
✓ ${parsed.experienceRange.min}+ years of hands-on experience
✓ Self-starter who thrives in a fast-paced environment
✓ Passion for clean code and great user experiences

📍 ${parsed.location} • ${getWorkModeEmoji(parsed.workMode)} ${parsed.workMode}
💰 Competitive salary + equity
🚀 Huge growth potential

Join us and help build the future!`
      },
      {
        version: 'Skills-first',
        description: 'Focused on outcomes and skills - Clear and direct',
        content: `${parsed.title} | ${parsed.location}

Skills You'll Use Daily:
${parsed.skills.map(s => `→ ${s}`).join('\n')}

What Success Looks Like:
You will deliver high-quality, scalable solutions that drive measurable results for our team and users. You'll work autonomously while collaborating effectively with cross-functional teams.

Your Responsibilities:
• Design and implement robust software solutions
• Collaborate with product and design teams
• Maintain and improve existing codebase
• Mentor junior team members

You're A Great Fit If:
• You have ${parsed.experienceRange.min}+ years working with: ${parsed.skills.slice(0, 3).join(', ')}
• You're outcome-focused and data-driven
• You can work independently and take ownership
• You care about code quality and best practices

Work Setup: ${parsed.workMode} from ${parsed.location}
Experience: ${parsed.experienceRange.min}-${parsed.experienceRange.max} years`
      }
    ];
    
    return jds;
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    addUserMessage(userMessage);
    setInput('');

    if (stage === 'gathering') {
      setUserRequirements(userMessage);
      setStage('generating');
      
      addBotMessage(
        "Perfect! I've got all the details. Let me generate some job descriptions for you... ✨",
        500
      );
      
      setTimeout(() => {
        const generatedJDs = generateJDs(userMessage);
        setJDOptions(generatedJDs);
        setStage('selecting');
        
        addBotMessage(
          "Great! I've created 3 different versions of your job description. Each has a unique style:\n\n1️⃣ **Formal** - Traditional corporate tone\n2️⃣ **Startup** - Modern and energetic\n3️⃣ **Skills-first** - Outcome-focused\n\nReview them below and select the one that best fits your company culture. You'll be able to edit it before publishing!",
          1500
        );
      }, 2000);
    }
  };

  const handleSelectJD = (jd: JDOption) => {
    setSelectedJD(jd);
    setEditedJD(jd.content);
    setStage('editing');
    
    addBotMessage(
      `Excellent choice! The **${jd.version}** version is now selected.\n\nFeel free to edit the job description below to make it perfect for your needs. When you're happy with it, click "Publish Job" to go live!`
    );
  };

  const handlePublish = async () => {
    if (!selectedJD || !editedJD.trim()) {
      toast.error('Please complete the job description');
      return;
    }

    setStage('publishing');
    addBotMessage("Publishing your job... 🚀", 500);

    setTimeout(() => {
      const parsed = parseRequirements(userRequirements);
      
      // Create the job
      const job = createJob({
        title: parsed.title,
        level: 'Mid',
        location: parsed.location,
        workMode: parsed.workMode as any,
        mustHaveSkills: parsed.skills.slice(0, 5),
        niceToHaveSkills: [],
        responsibilities: ['Develop and maintain software solutions', 'Collaborate with team'],
        experienceRange: parsed.experienceRange,
        selectedJD: editedJD,
        selectedJDVersion: selectedJD.version,
      });

      const link = `${window.location.origin}/apply/${job.title.toLowerCase().replace(/\s+/g, '-')}-${job.id}`;
      
      updateJob(job.id, {
        status: 'Published',
        acceptingApplications: true,
        publicLink: link,
      });

      setCurrentJobId(job.id);
      setStage('published');

      addBotMessage(
        `🎉 Congratulations! Your job posting for **${parsed.title}** is now live!\n\nWhat would you like to do next?`,
        1000
      );

      toast.success('Job published successfully!');
    }, 2000);
  };

  const handleGoToDashboard = () => {
    if (currentJobId) {
      navigate(`/job/${currentJobId}`);
    }
  };

  const handleGenerateAssessment = () => {
    if (currentJobId) {
      updateJob(currentJobId, {
        assessmentGenerationStatus: 'in-progress'
      });
      
      addBotMessage(
        "🔄 Assessment generation is now in progress!\n\nWe're creating a customized assessment based on your job requirements. This typically takes 5-10 minutes. You'll receive a notification once it's ready.\n\nYou can view the progress in the Job Dashboard under the Assessment tab.",
        500
      );
      
      toast.success('Assessment generation started! We\'ll notify you when it\'s ready.');
      
      setTimeout(() => {
        navigate(`/job/${currentJobId}`);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col p-8">
      <div className="max-w-5xl mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create Job with Rex</h2>
              <p className="text-sm text-gray-600">Your AI hiring assistant</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <Card className="flex-1 border-0 shadow-xl rounded-2xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'bot'
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-700">You</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* JD Options */}
            {stage === 'selecting' && jdOptions.length > 0 && (
              <div className="space-y-4 mt-6">
                {jdOptions.map((jd, index) => (
                  <Card
                    key={jd.version}
                    className={`cursor-pointer transition-all border-2 rounded-xl ${
                      selectedJD?.version === jd.version
                        ? 'border-red-600 shadow-lg'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => handleSelectJD(jd)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary">{index + 1}</Badge>
                            <h3 className="text-lg font-bold text-gray-900">{jd.version}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{jd.description}</p>
                        </div>
                        {selectedJD?.version === jd.version && (
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-hidden">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans line-clamp-4">
                          {jd.content.substring(0, 200)}...
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* JD Editor */}
            {(stage === 'editing' || stage === 'publishing') && selectedJD && (
              <div className="mt-6">
                <Card className="border-2 border-red-200 rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Edit className="w-4 h-4 text-red-600" />
                        Edit Your Job Description
                      </h3>
                      <Badge>{selectedJD.version} Version</Badge>
                    </div>
                    <Textarea
                      value={editedJD}
                      onChange={(e) => setEditedJD(e.target.value)}
                      className="min-h-[300px] font-mono text-sm mb-4"
                      placeholder="Edit your job description..."
                      disabled={stage === 'publishing'}
                    />
                    <Button
                      onClick={handlePublish}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      size="lg"
                      disabled={stage === 'publishing'}
                    >
                      {stage === 'publishing' ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Publish Job
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Published Actions */}
            {stage === 'published' && (
              <div className="mt-6">
                <Card className="border-2 border-green-200 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Job Published Successfully!</h3>
                      <p className="text-gray-600">Your job is now live and ready to receive applications</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button
                        onClick={handleGoToDashboard}
                        variant="outline"
                        size="lg"
                        className="border-2"
                      >
                        Go to Job Dashboard
                      </Button>
                      <Button
                        onClick={handleGenerateAssessment}
                        size="lg"
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Job Assessment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {stage !== 'selecting' && stage !== 'editing' && stage !== 'publishing' && stage !== 'published' && (
            <div className="border-t p-4">
              <div className="flex gap-3">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                  className="min-h-[60px] max-h-[200px] resize-none"
                  disabled={isTyping || stage === 'generating'}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping || stage === 'generating'}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 self-end"
                  size="lg"
                >
                  {stage === 'generating' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

function getWorkModeEmoji(mode: string): string {
  switch (mode) {
    case 'Remote': return '🏠';
    case 'Hybrid': return '🔄';
    case 'On-site': return '🏢';
    default: return '💼';
  }
}
