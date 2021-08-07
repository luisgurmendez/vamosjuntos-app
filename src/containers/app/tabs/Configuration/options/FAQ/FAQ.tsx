import PageWithBack from 'components/Page/PageWithBack';
import { Body, Subtitle } from 'components/Typography/Typography';
import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from 'utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { getFAQs } from 'api/callables';
import HideIfLoading from 'components/Loading/HideIfLoading';

const FAQs: React.FC = () => {

  const [openFAQ, setOpenFAQ] = useState(-1);
  const { faqs, isFetching: isFetchingFAQs } = useGetFAQs();

  const handleToggleOpen = (i: number) => () => {
    if (i === openFAQ) {
      setOpenFAQ(-1);
    } else {
      setOpenFAQ(i);
    }
  }

  return (
    <PageWithBack title="Preguntas Frecuentes">
      <HideIfLoading loading={isFetchingFAQs}>
        <ScrollView>
          {faqs.map((faq, i) => <FAQ faq={faq} open={openFAQ === i} onOpenChange={handleToggleOpen(i)} />)}
        </ScrollView>
      </HideIfLoading>
    </PageWithBack>
  )
}

export default FAQs;


function useGetFAQs() {
  const [isFetching, setIsFetching] = useState(true);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  useEffect(() => {
    getFAQs().then(setFaqs).finally(() => {
      setIsFetching(false);
    });
  }, []);
  return { faqs, isFetching };
}


export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faq: FAQItem;
  open: boolean;
  onOpenChange: () => void;

}

const FAQ: React.FC<FAQProps> = ({ faq, open, onOpenChange }) => {

  return (
    <Container>
      <Header onPress={onOpenChange} activeOpacity={0.8}>
        <Subtitle style={{ flex: 1 }}>{faq.question}</Subtitle>
        <Icon size={25} color={colors.black} name={open ? "chevron-up" : "chevron-down"} />
      </Header>
      {open && (
        <Content>
          <Body>{faq.answer}</Body>
        </Content>
      )}
    </Container>
  )
}

const Container = styled.View`
  padding:8px;
  margin:8px;
  background-color:white;
  border-radius:8px;
`

const Header = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  padding-vertical:8px;
`

const Content = styled.View`
  margin-top:8px;
`
