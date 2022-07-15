export declare type SendMessage = ({
    userHuid: string | null;
    groupChatId: string | null;
    messageBody: string;
    messageMeta?: {
        [key: string]: string | number;
    };
});
