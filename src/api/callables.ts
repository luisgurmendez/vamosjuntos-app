import { FeatureFlag, Message } from 'types/models';
import remoteConfig from '@react-native-firebase/remote-config';

// export const getUser = async (): Promise<User | undefined> => {
//   const user = (await southamericaFunctions.httpsCallable('userMe')()).data;
//   return user;
// }

// export const createRide = async (body: Partial<Ride>): Promise<Ride | undefined> => {
//   const response = (await southamericaFunctions.httpsCallable('rideCreate')(body));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.ride;
//   }
//   return undefined;
// };

// export const getRides = async (): Promise<Ride[]> => {
//   const response = (await southamericaFunctions.httpsCallable('rideGetAll')());
//   console.log(response)

//   if (response.data.success) {
//     return response.data.rides;
//   }
//   return [];
// };

// export const cancelRide = async (rideId: string): Promise<Ride | undefined> => {
//   const response = (await southamericaFunctions.httpsCallable('rideCancel')({ rideId }));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.ride;
//   }
//   return undefined;
// };

// export const createRideRequest = async (rideId: string, whereFrom: Address, whereTo: Address): Promise<RideRequest | undefined> => {
//   const response = (await southamericaFunctions.httpsCallable('rideRequestCreate')({ rideId, whereFrom, whereTo }));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.rideRequest;
//   }
//   return undefined;
// };

// export const cancelRideRequest = async (rideRequestId: string): Promise<boolean> => {
//   const response = (await southamericaFunctions.httpsCallable('rideRequestCancel')({ rideRequestId }));
//   console.log(response)

//   return response.data.success
// };

// export const acceptRideRequest = async (requestId: string): Promise<boolean> => {
//   const response = (await southamericaFunctions.httpsCallable('rideRequestAccept')({ requestId }));
//   console.log(response)

//   return response.data.success;
// };

// export const declineRideRequest = async (requestId: string): Promise<boolean> => {
//   const response = await southamericaFunctions.httpsCallable('rideRequestDecline')({ requestId });
//   console.log(response)

//   return response.data.success;
// };

// export const dropOutRide = async (rideId: string): Promise<Passenger | undefined> => {
//   const response = (await southamericaFunctions.httpsCallable('passengerDropOut')({ rideId }));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.passenger;
//   }
//   return undefined;
// };

// export const getRideRequests = async (): Promise<RideRequest[]> => {
//   const response = (await southamericaFunctions.httpsCallable('rideRequestGetAll')());
//   console.log(response)

//   if (response.data.success) {
//     return response.data.rideRequests;
//   }
//   return [];
// };

export const getFeatureFlags = async (): Promise<FeatureFlag[]> => {
  await remoteConfig().fetch(0);
  await remoteConfig().activate();
  const configs = remoteConfig().getAll();
  const featureFlags: FeatureFlag[] = [];
  Object.keys(configs).forEach(configKey => {
    featureFlags.push({
      name: configKey,
      enabled: configs[configKey].asBoolean()
    })
  })

  return featureFlags;
};

// interface PossibleRidesData {
//   whereFrom: Address;
//   whereTo: Address;
//   date: string;
// }

// export const getPossibleRides = async (data: PossibleRidesData): Promise<Ride[]> => {
//   const response = (await southamericaFunctions.httpsCallable('ridePossibleRides')(data));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.rides;
//   }
//   return [];
// };

// interface SoonToLeaveRidesData {
//   addresses: Address[];
// }

// export const getSoonToLeaveRides = async (data: SoonToLeaveRidesData): Promise<Ride[]> => {
//   const response = (await southamericaFunctions.httpsCallable('rideSoonToLeaveRides')(data));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.rides;
//   }
//   return [];
// };

// export const getRide = async (rideId: string): Promise<Ride | undefined> => {
//   const response = (await southamericaFunctions.httpsCallable('rideGet')({ rideId }));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.ride;
//   }
//   return undefined;
// };

// export const getNotifications = async (): Promise<Notification[]> => {
//   const response = (await southamericaFunctions.httpsCallable('notificationGet')({}));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.notifications;
//   }
//   return [];
// };

// export const setSeenNotifications = async (notificationIds: number[] | string[]): Promise<boolean> => {
//   const response = (await southamericaFunctions.httpsCallable('notificationSeen')({ notifications: notificationIds }));
//   console.log(response)

//   return response.data.success;
// };

// export const updateUser = async (user: User): Promise<User> => {
//   const response = (await southamericaFunctions.httpsCallable('userUpdate')(user));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.user;
//   }
//   return user;
// };

// export const getReviews = async (userId: string): Promise<Review[]> => {
//   const response = (await southamericaFunctions.httpsCallable('reviewGetUserReviews')({ userId: userId }));
//   console.log(response)

//   if (response.data.success) {
//     return response.data.reviews;
//   }
//   return [];
// };

// export const getOwesReviews = async (): Promise<Passenger | undefined> => {
//   const response = (await southamericaFunctions.httpsCallable('reviewOwes')());
//   console.log(response)

//   if (response.data.success && response.data.owes) {
//     return response.data.owes;
//   }
//   return undefined;
// };


// export const sendComplaint = async (complaint: string): Promise<boolean> => {
//   const response = (await southamericaFunctions.httpsCallable('complaintCreate')({ complaint }));
//   console.log(response)
//   return response.data.success;
// };

// interface ReviewBody {
//   toUserId: string;
//   rideId: string;
//   comment: string;
//   score: number;
//   passengerId: Passenger['id'];
// }

// export const createReview = async (data: ReviewBody): Promise<boolean> => {
//   const response = (await southamericaFunctions.httpsCallable('reviewCreate')(data));
//   console.log(response)
//   return response.data.success;
// };

// export const setRideCompleted = async (rideId: string): Promise<boolean> => {
//   const response = (await southamericaFunctions.httpsCallable('rideComplete')({ rideId }));
//   console.log(response)

//   return response.data.success;
// }

// export const updateUserNotificationToken = async (token: string, userId: string): Promise<boolean> => {
//   const response = (await southamericaFunctions.httpsCallable('userUpdate')({ id: userId, notificationToken: token }));
//   console.log(response)
//   return response.data.success
// };


// export const getUserRideDetails = async (userId: string): Promise<UserRideDetails> => {
//   const response = (await southamericaFunctions.httpsCallable('userGetRideDetails')({ userId }));
//   console.log(response.data)
//   return response.data.details
// };

// export async function createCallable<R, D = {}>(callable: string, data?: D, defaultValue?: R) {
//   const response = (await southamericaFunctions.httpsCallable(callable)(data));
//   if (response.data.success) {
//     return response.data as R
//   }
//   return defaultValue;
// }

// export const getFAQs = async (): Promise<FAQItem[]> => {
//   const response = (await southamericaFunctions.httpsCallable('getFAQs')());
//   console.log(response.data)
//   return response.data.faqs;
// };

// export const kickPassenger = async (passengerId: string): Promise<boolean> => {
//   const response = (await southamericaFunctions.httpsCallable('passengerKicked')({ passengerId }));
//   return response.data.success;
// };

export interface GetMessagesResponse {
  messages: Message[];
  messagesCount: number;
}

// export const getMessages = async (rideId: string, skip?: number, take?: number): Promise<GetMessagesResponse | undefined> => {
//   const response = (await southamericaFunctions.httpsCallable('messagesGet')({ rideId, skip, take }));
//   if (response.data.success) {
//     return response.data;
//   }
//   return undefined;
// };

// interface MessageCreate {
//   location?: Address;
//   message?: string;
//   rideId: string;
//   type: MessageType;
// }

// export const createMessage = async (message: MessageCreate) => {
//   const response = (await southamericaFunctions.httpsCallable('messagesCreate')(message));
//   console.log(response)
//   return response.data.message;
// }

// export const deleteUserRequest = async (): Promise<boolean> => {
//   const response = (await southamericaFunctions.httpsCallable('userDeletionRequestCreate')());
//   console.log(response)
//   return response.data.success;
// };
