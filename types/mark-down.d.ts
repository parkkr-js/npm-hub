export interface MarkDownProps {
  packageName: string;
}

export interface MarkdownComponents {
  children: React.ReactNode;
  href: string;
  src: string;
  alt: string;
  inline: boolean;
  className: string;
}

export interface MarkDownData {
  interest: MarkdownComponents[];
}
