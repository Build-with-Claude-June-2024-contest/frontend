// eslint-disable-next-line import/no-extraneous-dependencies
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';

import Providers from '~/app/providers';
import Layout from '~/lib/layout';

import 'antd/dist/reset.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'AI Recruiter';

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: '%s | AI Recruiter',
  },
  description:
    'AI Recruiter is a app to help you find the best candidates for your job.',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: APP_NAME,
    description:
      'AI Recruiter is a app to help you find the best candidates for your job.',
    images: {
      url: 'https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'nextarter-chakra.sznm.dev og-image',
    },
  },
  twitter: {
    creator: '@sozonome',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Providers>
            <Layout>
              {children}
              <Analytics />
            </Layout>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
