import ScoreInput from 'components/Score/ScoreInput';
import ScoreDisplay from 'components/Score/Score';

import { Title } from 'components/Typography/Typography';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Score() {

  const [score, setS] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setS(Math.random() * 5)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Title>Score!</Title>
      <ScoreInput />
      <ScoreDisplay score={1} />
      <ScoreDisplay score={2} />
      <ScoreDisplay score={3} />
      <ScoreDisplay score={4} />
      <ScoreDisplay score={5} />
      <ScoreDisplay score={score} />
    </View>
  );
}
