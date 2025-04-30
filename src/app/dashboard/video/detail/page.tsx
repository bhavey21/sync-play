import { Suspense } from 'react';
import VideoPageContent from './VideoPage';

export default function VideoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoPageContent />
    </Suspense>
  );
}
