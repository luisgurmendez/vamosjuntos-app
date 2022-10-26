import PageWithBack from 'components/Page/PageWithBack';
import { Body, Subtitle } from 'components/Typography/Typography';
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native';
import { SavedAddress } from 'types/storage';
import { Box } from 'components/Box/Box';
import useCallable from 'hooks/useCallable';
import { SavedSearchRide as SavedSearchRideModel } from 'types/models';
import ScrollableContent from 'components/ScrollableContent/ScrollableContent';
import MarginedChildren from 'components/Box/MarginedChildren';
import RemovableItem from 'components/RemovableItem/RemovableItem';
import RideDetailsSummary from 'components/Ride/RideDetailsSummary';

interface SavedSearchRidesProps {
}

const SavedSearchRides: React.FC<SavedSearchRidesProps> = ({ }) => {

    const getAll = useCallable<SavedSearchRideModel[]>('/users/search-ride/get-all');

    const [searches, setSearches] = useState<SavedSearchRideModel[]>([]);
    const [isFetching, setIsFecthing] = useState(false);

    const handleGetAll = useCallback(() => {
        setIsFecthing(true);
        getAll().then((data) => {
            setSearches(data.data);
        }).finally(() => {
            setIsFecthing(false);
        })
    }, [])

    useEffect(() => {
        handleGetAll();
    }, [handleGetAll])

    const noContentHelp = () => {
        return (
            <>
                <Body>Las alertas de viaje sirven para notificarte una vez que se crea un viaje que te sirva.</Body>
            </>
        )
    };

    return (
        <PageWithBack title='Tus alertas de viaje'>
            <Container
                refreshing={isFetching}
                showContent={searches.length !== 0}
                noContentHelp={noContentHelp()}
            >
                <MarginedChildren mt="lg" mH='lg'>
                    {searches.map(search => <SavedSearchRide onDelete={handleGetAll} key={search.id} search={search} />)}
                </MarginedChildren>

            </Container>
        </PageWithBack>
    )

}

export default SavedSearchRides

interface Props {
    search: SavedSearchRideModel
    onDelete: () => void;
}

const SavedSearchRide: React.FC<Props> = ({ search, onDelete }) => {
    const deleteSavedSearch = useCallable('/users/search-ride/delete');
    const [isFetching, setIsFetching] = useState(false);

    const handleDelete = async () => {
        setIsFetching(true);
        await deleteSavedSearch({ savedSearchRideDataId: search.id });
        onDelete();
        setIsFetching(false);
    }

    return (
        <Box pH='xlg'>
            <RemovableItem onRemove={handleDelete}>
                <RideDetailsSummary whereFrom={search.whereFrom} whereTo={search.whereTo} date={search.date} />
            </RemovableItem>
        </Box>
    );

}

const Container = styled(ScrollableContent)`
    padding: 16px;
`