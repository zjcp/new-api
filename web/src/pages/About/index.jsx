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

import React, { useEffect, useState } from 'react';
import { API, showError } from '../../helpers';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import { IconInfoCircle, IconMail, IconClock } from '@douyinfe/semi-icons';

const About = () => {
  const { t } = useTranslation();
  const [about, setAbout] = useState('');
  const [aboutLoaded, setAboutLoaded] = useState(false);

  const displayAbout = async () => {
    setAbout(localStorage.getItem('about') || '');
    const res = await API.get('/api/about');
    const { success, message, data } = res.data;
    if (success) {
      let aboutContent = data;
      if (!data.startsWith('https://')) {
        aboutContent = marked.parse(data);
      }
      setAbout(aboutContent);
      localStorage.setItem('about', aboutContent);
    } else {
      showError(message);
      setAbout(t('加载关于内容失败...'));
    }
    setAboutLoaded(true);
  };

  useEffect(() => {
    displayAbout().then();
  }, []);

  return (
    <div className='mt-[60px] px-2'>
      {aboutLoaded && about === '' ? (
        <div className='flex justify-center w-full'>
          <div className='w-full max-w-[1000px] py-10'>
            <div
              className='rounded-2xl p-5 mb-8 flex items-start gap-4'
              style={{
                backgroundColor: 'var(--semi-color-bg-1)',
                boxShadow: 'var(--semi-shadow-elevated)',
              }}
            >
              <div
                className='w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm'
                style={{
                  color: 'var(--semi-color-info)',
                  backgroundColor: 'rgba(22, 119, 255, 0.12)',
                }}
              >
                <IconInfoCircle style={{ fontSize: '28px' }} />
              </div>
              <div className='pt-1'>
                <div style={{ fontWeight: 'bold', color: 'var(--semi-color-text-0)', marginBottom: '4px' }}>
                  {t('需要帮助?')}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--semi-color-text-2)' }}>
                  {t('我们的客服团队随时准备为您提供专业的支持服务')}
                </div>
              </div>
            </div>

            <div className='mb-10'>
              <h1
                className='text-2xl font-bold mb-4'
                style={{ color: 'var(--semi-color-text-0)' }}
              >
                {t('客户支持')}
              </h1>
              <p
                className='text-base'
                style={{ color: 'var(--semi-color-text-2)' }}
              >
                {t('我们随时为您提供帮助。请选择以下任一方式与我们联系。')}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
              <div
                className='rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full'
                style={{
                  backgroundColor: 'var(--semi-color-bg-1)',
                  border: '1px solid var(--semi-color-border)',
                  boxShadow: 'var(--semi-shadow-elevated)',
                }}
              >
                <div
                  className='w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white shadow-sm'
                  style={{ backgroundColor: 'rgba(0, 132, 255, 0.92)' }}
                >
                  <IconMail style={{ fontSize: '26px' }} />
                </div>
                <h3
                  className='text-lg m-0 mb-2'
                  style={{ color: 'var(--semi-color-text-0)' }}
                >
                  {t('邮件支持')}
                </h3>
                <p
                  className='text-[15px] m-0 font-semibold tracking-wide leading-relaxed'
                  style={{ color: 'var(--semi-color-primary)' }}
                >
                  <a href='mailto:support@atokenapi.com'>
                    support@atokenapi.com
                  </a>
                </p>
              </div>

              <div
                className='rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full'
                style={{
                  backgroundColor: 'var(--semi-color-bg-1)',
                  border: '1px solid var(--semi-color-border)',
                  boxShadow: 'var(--semi-shadow-elevated)',
                }}
              >
                <div
                  className='w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white shadow-sm'
                  style={{ backgroundColor: 'rgba(255, 184, 77, 0.96)' }}
                >
                  <IconClock style={{ fontSize: '26px' }} />
                </div>
                <h3
                  className='text-lg m-0 mb-2'
                  style={{ color: 'var(--semi-color-text-0)' }}
                >
                  {t('在线时间')}
                </h3>
                <p
                  className='text-sm m-0 leading-relaxed'
                  style={{ color: 'var(--semi-color-text-2)' }}
                >
                  {t('周一至周日')}
                  <br />
                  10:00 - 24:00
                </p>
              </div>

              <div
                className='rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-full'
                style={{
                  backgroundColor: 'var(--semi-color-bg-1)',
                  border: '1px solid var(--semi-color-border)',
                  boxShadow: 'var(--semi-shadow-elevated)',
                }}
              >
                <div className='mb-4'>
                  <div
                    className='font-bold text-lg mb-2'
                    style={{ color: 'var(--semi-color-text-0)' }}
                  >
                    {t('客服二维码')}
                  </div>
                  <p
                    className='text-[13px] m-0 leading-relaxed'
                    style={{ color: 'var(--semi-color-text-2)' }}
                  >
                    {t('扫描二维码联系客服')}
                  </p>
                </div>
                <div
                  className='p-4 inline-block rounded-2xl self-start'
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid var(--semi-color-border)',
                  }}
                >
                  <div className='flex gap-3 items-start justify-center'>
                    <div className='flex flex-col items-center gap-2'>
                      <img
                        src='/tel.png'
                        alt='Telegram'
                        className='w-[104px] h-[104px] rounded-xl object-cover'
                        style={{ backgroundColor: 'var(--semi-color-bg-1)' }}
                      />
                      <div className='text-[12px] text-center' style={{ color: 'var(--semi-color-text-2)' }}>
                        Telegram
                      </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                      <img
                        src='/wx.png'
                        alt='Wechat'
                        className='w-[104px] h-[104px] rounded-xl object-cover'
                        style={{ backgroundColor: 'var(--semi-color-bg-1)' }}
                      />
                      <div className='text-[12px] text-center' style={{ color: 'var(--semi-color-text-2)' }}>
                        Wechat
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {about.startsWith('https://') ? (
            <iframe
              src={about}
              style={{ width: '100%', height: '100vh', border: 'none' }}
            />
          ) : (
            <div
              style={{ fontSize: 'larger' }}
              dangerouslySetInnerHTML={{ __html: about }}
            ></div>
          )}
        </>
      )}
    </div>
  );
};

export default About;
