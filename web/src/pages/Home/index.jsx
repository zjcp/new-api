/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Input,
  ScrollList,
  ScrollItem,
} from '@douyinfe/semi-ui';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { API_ENDPOINTS } from '../../constants/common.constant';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import {
  IconGithubLogo,
  IconPlay,
  IconFile,
  IconCopy,
} from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import {
  Moonshot,
  OpenAI,
  XAI,
  Zhipu,
  Volcengine,
  Cohere,
  Claude,
  Gemini,
  Suno,
  Minimax,
  Wenxin,
  Spark,
  Qingyan,
  DeepSeek,
  Qwen,
  Midjourney,
  Grok,
  AzureAI,
  Hunyuan,
  Xinference,
} from '@lobehub/icons';

const { Text } = Typography;

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;
  const endpointItems = API_ENDPOINTS.map((e) => ({ value: e }));
  const [endpointIndex, setEndpointIndex] = useState(0);
  const isChinese = i18n.language.startsWith('zh');

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      // 如果内容是 URL，则发送主题模式
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent(t('加载首页内容失败...'));
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % endpointItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  return (
    <div className='w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {homePageContentLoaded && homePageContent === '' ? (
        <div className='w-full overflow-x-hidden'>
          {/* Hero Section */}
          <div className="relative overflow-hidden py-20 lg:py-32" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)' }}>
            <div className="absolute -top-[50%] -right-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,transparent_70%)] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {t('解锁未来之门！AI聚合管理')}
                  </h1>
                  <p className="text-base text-gray-400 mb-8 leading-relaxed">
                    {t('全网最稳定的官方企业级 1000 Mbps 带宽中转，触达8个地区 20万+ 客户。 注册即送 $0.2，明码实价，绝对不搞虚的，36个月 稳定运营。')}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-12">
                    <Link to='/console'>
                      <Button theme='solid' type='primary' size='large' className='!px-8 !py-6 !text-lg !rounded-xl !bg-blue-600 hover:!bg-blue-700' icon={<IconPlay />}>
                        {t('立即开始')}
                      </Button>
                    </Link>
                    {docsLink && (
                      <Button size='large' className='!px-8 !py-6 !text-lg !rounded-xl !text-blue-600 !border-blue-600 hover:!bg-blue-600 hover:!text-white' icon={<IconFile />} onClick={() => window.open(docsLink, '_blank')}>
                        {t('查看模型')}
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-8 md:gap-12 pt-8 border-t" style={{ borderColor: '#cdcdcd' }}>
                    <div className="text-center">
                      <div className="inline-block px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-3xl font-bold" style={{ color: '#2563eb' }}>100+</div>
                      <div className="text-sm text-gray-400 mt-2">{t('支持模型')}</div>
                    </div>
                    <div className="text-center">
                      <div className="inline-block px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-3xl font-bold" style={{ color: '#2563eb' }}>30K</div>
                      <div className="text-sm text-gray-400 mt-2">{t('RPM 并发')}</div>
                    </div>
                    <div className="text-center">
                      <div className="inline-block px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-3xl font-bold" style={{ color: '#2563eb' }}>99.9%</div>
                      <div className="text-sm text-gray-400 mt-2">{t('可用性')}</div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block lg:col-span-5 relative">
                  <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4 text-sm font-medium" style={{ color: '#9ca3af' }}>
                      <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.298 1.932v5.608h-.536v-4.32H8.758c-1.176 0-2.132.955-2.132 2.133v2.952h-.536v5.608h.536v.803c0 .804.653 1.457 1.457 1.457h7.718v-4.32h-.536v-4.32h3.21c1.176 0 2.132-.955 2.132-2.133v-2.952h.536v-.803c0-.804-.653-1.457-1.457-1.457h-7.718V1.932h.536z"/>
                      </svg>
                      <span>{t('Python 示例')}</span>
                    </div>
                    <pre className="bg-[#0f172a] rounded-xl p-4 font-mono text-xs leading-relaxed overflow-x-auto text-[#c9d1d9] m-0">
                      <span className="text-[#7ee787]">pip install openai</span>{'\n\n'}
                      <span className="text-[#79c0ff]">from</span> <span className="text-[#d2a8ff]">openai</span> <span className="text-[#79c0ff]">import</span> <span className="text-[#d2a8ff]">OpenAI</span>{'\n\n'}
                      <span className="text-[#ff7b72]">client</span> = <span className="text-[#d2a8ff]">OpenAI</span>({'\n'}
                      {'    '}api_key=<span className="text-[#a5d6ff]">"YOUR_API_KEY"</span>,{'\n'}
                      {'    '}base_url=<span className="text-[#a5d6ff]">"{serverAddress}/v1"</span>{'\n'}
                      ){'\n\n'}
                      <span className="text-[#d2a8ff]">response</span> = <span className="text-[#ff7b72]">client</span>.chat.completions.create({'\n'}
                      {'    '}model=<span className="text-[#a5d6ff]">"gpt-4o"</span>,{'\n'}
                      {'    '}messages=[{`{`}<span className="text-[#a5d6ff]">"role"</span>: <span className="text-[#a5d6ff]">"user"</span>, <span className="text-[#a5d6ff]">"content"</span>: <span className="text-[#a5d6ff]">"hi"</span>{`}`}]
                      ){'\n\n'}
                      <span className="text-[#ff7b72]">print</span>(response.choices[<span className="text-[#79c0ff]">0</span>].message.content)
                    </pre>
                    <div className="mt-4 p-3 rounded-lg border flex items-center gap-3" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: '#10b981' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                      <span className="text-sm" style={{ color: '#10b981' }}>{t('3 行代码完成接入')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-20" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">{t('为什么选择我们')}</h2>
              <p className="text-gray-500 text-center mb-12">{t('稳定、高效、低成本，一站式 AI 解决方案')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: t('极速响应'), desc: t('平均响应时间 < 100ms，全球CDN加速，让AI触手可及'), score: 95, iconBg: '#fef3c7', iconColor: '#d97706', barColor: 'bg-gradient-to-r from-blue-600 to-emerald-500', svg: <path d="M13 2 3 14 12 14 11 22 21 10 12 10 13 2" /> },
                  { title: t('企业级安全'), desc: t('银行级加密传输，完善的权限管理，保障数据安全'), score: 99, iconBg: '#dcfce7', iconColor: '#16a34a', barColor: 'bg-gradient-to-r from-blue-600 to-emerald-500', svg: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
                  { title: t('多模型支持'), desc: t('300+ AI模型一键切换，从文本到图像全覆盖'), score: 100, iconBg: '#e0e7ff', iconColor: '#4f46e5', barColor: 'bg-gradient-to-r from-blue-600 to-emerald-500', svg: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></> },
                  { title: t('全球部署'), desc: t('覆盖全球主要地区，就近接入，极致体验'), score: 88, iconBg: '#e0f2fe', iconColor: '#0284c7', barColor: 'bg-gradient-to-r from-blue-600 to-emerald-500', svg: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></> },
                  { title: t('智能优化'), desc: t('智能路由算法，动态负载均衡，持续优化性能'), score: 92, iconBg: '#fef3c7', iconColor: '#d97706', barColor: 'bg-gradient-to-r from-blue-600 to-emerald-500', svg: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></> },
                  { title: t('开发友好'), desc: t('完整SDK支持，详细文档，5分钟完成集成'), score: 97, iconBg: '#fce7f3', iconColor: '#db2777', barColor: 'bg-gradient-to-r from-blue-600 to-emerald-500', svg: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></> },
                ].map((feature, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: feature.iconBg }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={feature.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                        {feature.svg}
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-500 text-sm mb-6">{feature.desc}</p>
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>{t('性能评分')}</span>
                      <span className="text-blue-600 font-semibold">{feature.score}%</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${feature.score}%`, background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)', borderRadius: '9999px', transition: 'width 0.5s' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Models Section */}
          <div className="py-20" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('AI模型生态系统')}</h2>
              <p className="text-gray-400 mb-12">{t('连接全球顶级AI模型，统一接口调用，让您的应用具备无限可能')}</p>
              <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3 max-w-6xl mx-auto justify-items-center">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}>
                  <Moonshot size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #a7f3d0 100%)' }}>
                  <OpenAI size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)' }}>
                  <Grok size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #67e8f9 100%)' }}>
                  <Zhipu.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ffedd5 0%, #fde047 100%)' }}>
                  <Volcengine.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ccfbf1 0%, #cffafe 100%)' }}>
                  <Cohere.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ffedd5 0%, #fb923c 100%)' }}>
                  <Claude.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)' }}>
                  <Gemini.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #f4f4f5 0%, #e7e5e4 100%)' }}>
                  <Suno size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}>
                  <Minimax.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)' }}>
                  <Wenxin.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)' }}>
                  <Spark.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #bbf7d0 100%)' }}>
                  <Qingyan.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #cffafe 0%, #e0f2fe 100%)' }}>
                  <DeepSeek.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' }}>
                  <Qwen.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #f3e8ff 100%)' }}>
                  <Midjourney size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 100%)' }}>
                  <AzureAI.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%)' }}>
                  <Hunyuan.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                  <Xinference.Color size={40} />
                </div>
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
                  <span className="text-xl font-bold text-gray-700">30+</span>
                </div>
              </div>
              <div className="mt-8 text-center">
                <a href="https://atokenapi.com/pricing" target="_blank" className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1">
                  {t('每个模型都是一件艺术品，等待被您的创意唤醒 →')}
                </a>
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">{t('三步快速接入')}</h2>
              <p className="text-gray-400 text-center mb-12">{t('几分钟即可开始使用')}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6" style={{ color: '#ffffff', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}>
                    <span className="text-white">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('注册账号')}</h3>
                  <p className="text-gray-400 text-sm">{t('创建账号即送 0.2 美元体验额度，无需充值即可试用')}</p>
                </div>
                <div className="text-center p-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6" style={{ color: '#ffffff', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}>
                    <span className="text-white">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('获取 API Key')}</h3>
                  <p className="text-gray-400 text-sm">{t('在控制台创建 API Key，完全兼容 OpenAI 格式')}</p>
                </div>
                <div className="text-center p-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6" style={{ color: '#ffffff', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}>
                    <span className="text-white">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('开始调用')}</h3>
                  <p className="text-gray-400 text-sm">{t('替换 Base URL 即可使用，支持所有主流开发语言')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-20" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>{t('立即开始使用')}</h2>
              <p className="text-xl mb-8" style={{ color: 'rgba(255,255,255,0.9)' }}>{t('新用户注册即送 0.2 美元体验额度，无门槛试用')}</p>
              <Link to='/console'>
                <button className="px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{ background: '#ffffff', color: '#2563eb' }}>
                  {t('免费注册试用')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
            />
          ) : (
            <div
              className='mt-[60px]'
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
