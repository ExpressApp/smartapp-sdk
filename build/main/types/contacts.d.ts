export declare type SendMessageMethodParams = ({
    userHuid: string | null;
    groupChatId: string | null;
    messageBody: string;
    messageMeta?: {
        [key: string]: string | number;
    };
});
