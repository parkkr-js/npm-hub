import Image from 'next/image';

export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 bg-secondary-100">
        <Image
          src="/images/대쉬보드 중앙 상단.svg"
          alt="background pattern"
          fill
          className="object-contain pointer-events-none"
          style={{ objectPosition: 'top' }}
          priority
        />
        {children}
      </div>
    </>
  );
}
