import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { firestore } from 'services/firebase';

const Notification = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const [notes, setNotes] = useState<any[]>([]);
  const [text, setText] = useState<string>('');
  const [isTyping, setTyping] = useState<boolean>(false);
  let lastUpdateTime = Date.now();
  let typingTimeout: NodeJS.Timeout | undefined = undefined;

  useEffect(() => {
    if (user) {
      firestore.collection('users').doc(user._id).set({ id: user._id });
    }
  }, [user]);

  useEffect(() => {
    if (firestore) {
      firestore.collection('note').onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setNotes(data);
      });

      firestore
        .collection('users')
        .doc(user._id)
        .onSnapshot((doc) => {
          const data = { ...doc.data() };
          setTyping(data.isTyping);
        });
    }
    return () => {
      stopCheckingTyping();
    };
  }, [firestore, isTyping]);

  const updateTyping = (isTyping: boolean) => {
    if (firestore) {
      firestore.collection('users').doc(user._id).set({ isTyping: isTyping });
    }
  };

  const sendTyping = () => {
    lastUpdateTime = Date.now();
    if (!isTyping) {
      // setTyping(true)
      updateTyping(true);
      startCheckingTyping();
    }
  };

  const startCheckingTyping = () => {
    console.log('typing');
    typingTimeout = setTimeout(() => {
      if (Date.now() - lastUpdateTime > 1000) {
        // setTyping(false)
        stopCheckingTyping();
      }
    }, 1000);
  };

  const stopCheckingTyping = () => {
    console.log('stop');
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      updateTyping(false);
    }
  };

  return (
    <div>
      Hello
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key != 'Enter') sendTyping();
        }}
        onKeyUp={(e) => {
          if (e.key != 'Enter') sendTyping();
        }}
      />
      {isTyping && 'typing...'}
      {notes.map((item: any, i: number) => (
        <div key={i}>{item.content}</div>
      ))}
    </div>
  );
};

export default Notification;
