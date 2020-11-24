import ScoreInput from 'components/Score/ScoreInput';
import ScoreDisplay from 'components/Score/Score';

import { Title } from 'components/Typography/Typography';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Score() {
  const [score, setS] = useState(1);
  const handleChange = (v: number) => {
    setS((v + score) / 2);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Title>Score!</Title>
      <ScoreInput onChange={handleChange} />
      <ScoreDisplay score={score} />
    </View>
  );
}
