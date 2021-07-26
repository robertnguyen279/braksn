import Polly from 'components/Polly';
import React from 'react';

const VoiceText = ({ content, articleId }: any) => {
  return (
    <div className="mb-3">
      <Polly content={content} articleId={articleId} />
    </div>
  );
};

export default VoiceText;
