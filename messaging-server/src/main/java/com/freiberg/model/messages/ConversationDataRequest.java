package com.freiberg.model.messages;

import com.freiberg.model.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConversationDataRequest extends AbstractMessage {

    private String contactId;

    private Integer page;
    private Integer limit;
    private String sort;

    public PageRequest getPageRequest() {
        validateAndCorrectPagingParams();
        return PageRequest.of(page, limit, sort == null ? Sort.unsorted() : Sort.by(sort));
    }

    @Override
    public MessageType getMessageType() {
        return MessageType.CONVERSATION_DATA_REQUEST;
    }

    private void validateAndCorrectPagingParams() {
        if (page == null || page < 0) {
            page = 0;
        }
        if (limit == null || limit < 1) {
            limit = Integer.MAX_VALUE;
        }
    }
}
