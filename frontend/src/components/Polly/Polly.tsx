import React, { useEffect, useRef, useState } from 'react';
import { polly, S3_BUCKET_ASSETS, myBucket } from 'services/aws';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import LoadingSpinIcon from 'assets/icons/loading-spin.svg';

const Polly = ({ content, articleId }: any) => {
  const [isLoading, setLoading] = useState(true);
  const ref = useRef<AudioPlayer>(null);
  const params = {
    OutputFormat: 'mp3',
    Text: content,
    TextType: 'text',
    VoiceId: 'Joanna',
  };

  const streamMp3 = () => {
    polly.synthesizeSpeech(params, (err, data) => {
      if (err) console.log(err);
      else {
        setLoading(false);
        // @ts-ignore
        const uInt8Array = new Uint8Array(data.AudioStream);
        const arrayBuffer = uInt8Array.buffer;
        const blob = new Blob([arrayBuffer]);
        const url = URL.createObjectURL(blob);
        const audio: any = ref.current?.audio.current;
        if (audio) {
          audio.src = url;
        }
      }
    });
  };

  const loadMp3 = (id: any) => {
    polly.getSpeechSynthesisTask({ TaskId: id ? id : '' }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const audio: any = ref.current?.audio.current;
        if (audio) {
          audio.src = data.SynthesisTask?.OutputUri;
          audio.onerror = function () {
            setTimeout(() => {
              loadMp3(id);
            }, 3000);
          };
          audio.onloadeddata = function () {
            setLoading(false);
            console.log('loaded');
          };
        }
      }
    });
  };

  const saveMp3 = () => {
    polly.startSpeechSynthesisTask(
      {
        ...params,
        OutputS3KeyPrefix: articleId,
        OutputS3BucketName: S3_BUCKET_ASSETS,
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          loadMp3(data.SynthesisTask?.TaskId);
        }
      },
    );
  };

  const loadingSpin = () => (
    <div className="w-max p-2 my-5">
      <img src={LoadingSpinIcon} alt="loading-icon" className="w-8 h-8" />
    </div>
  );

  useEffect(() => {
    setLoading(true);

    if (content != 'Failed to load content.') {
      console.log(content.length);
      if (content.length < 3000) {
        streamMp3();
      } else {
        myBucket.listObjects(
          {
            Bucket: S3_BUCKET_ASSETS,
            MaxKeys: 1000,
            Prefix: articleId,
          },
          (err, data) => {
            if (err) console.log(err);
            else {
              if (data.Contents && data.Contents.length > 0) {
                setLoading(false);
                const key = data.Contents[0].Key;
                const audio: any = ref.current?.audio.current;
                if (audio) {
                  audio.src = `https://dt3-static-assets.s3-ap-southeast-1.amazonaws.com/${key}`;
                }
              } else {
                saveMp3();
              }
            }
          },
        );
      }
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="grid justify-items-center w-full">
      {isLoading && loadingSpin()}

      <div className={`${isLoading ? 'h-0' : 'h-full'} overflow-hidden shadow-lg w-full duration-300`}>
        <AudioPlayer ref={ref} autoPlayAfterSrcChange={false} customVolumeControls={[]} />
      </div>
    </div>
  );
};

export default Polly;
