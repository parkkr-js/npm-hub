'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { remark } from 'remark';
import html from 'remark-html';
import { Card, CardBody } from '@nextui-org/card';
import { Spinner } from '@nextui-org/spinner';

interface MarkdownSectionProps {
  packageName: string;
}

export default function MarkdownSection({ packageName }: MarkdownSectionProps) {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAndProcessReadme = async () => {
      setIsLoading(true);
      setError('');

      try {
        let markdownContent: string;
        try {
          const response = await axios.get(`https://unpkg.com/${packageName}/README.md`);
          markdownContent = response.data;
        } catch {
          const response = await axios.get(`https://unpkg.com/${packageName}/readme.md`);
          markdownContent = response.data;
        }

        const processedContent = await remark().use(html).process(markdownContent);

        setContent(processedContent.toString());
      } catch (error) {
        setError('README를 불러올 수 없습니다.');
        console.error('README 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (packageName) {
      fetchAndProcessReadme();
    }
  }, [packageName]);

  if (isLoading) {
    return (
      <Card className="w-full bg-secondary-90">
        <CardBody className="flex items-center justify-center p-8">
          <Spinner
            classNames={{
              base: 'h-8 w-8',
              circle1: 'border-primary-40',
              circle2: 'border-primary-30',
            }}
          />
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-secondary-90">
        <CardBody>
          <p className="text-alert-red">{error}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-secondary-90">
      <CardBody className="p-6">
        <div
          className="prose max-w-none
            prose-p:text-surface-medium
            prose-headings:text-surface-white
            prose-strong:text-surface-white
            prose-code:bg-secondary-80 prose-code:text-surface-white
            prose-pre:bg-secondary-80 prose-pre:border-secondary-70
            prose-a:text-primary-40 hover:prose-a:text-primary-30
            prose-blockquote:border-secondary-70 prose-blockquote:text-surface-medium
            prose-li:text-surface-medium prose-li:marker:text-surface-disabled
            prose-table:text-surface-medium
            prose-th:bg-secondary-80 prose-th:text-surface-white
            prose-td:border-secondary-70"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardBody>
    </Card>
  );
}
