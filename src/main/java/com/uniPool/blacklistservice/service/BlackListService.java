package com.uniPool.blacklistservice.service;

import com.uniPool.blacklistservice.VO.User;
import com.uniPool.blacklistservice.entity.BlackList;
import com.uniPool.blacklistservice.repository.BlackListRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class BlackListService {
    @Autowired
    private BlackListRepository blackListRepository;
    @Autowired
    private RestTemplate restTemplate;
    public BlackList block(BlackList blackList) {
        log.info("block in BlackListService------------------");
        boolean blockerExists = restTemplate.getForObject("http://localhost:8081/users/exists/id/" + blackList.getBlockerUserId(),
                                boolean.class);
        boolean blockedExists = restTemplate.getForObject("http://localhost:8081/users/exists/id/" + blackList.getBlockedUserId(),
                boolean.class);
        if(!blockerExists || !blockedExists)
            throw new RuntimeException("User does not exist");
        return blackListRepository.save(blackList);
    }

    public Object unblock(BlackList blackList) {
        if (!blackListRepository.existsById(blackList.getBlackListId())
            || !blackListRepository.existsByBlockerUserId(blackList.getBlockerUserId())
            || !blackListRepository.existsByBlockedUserId(blackList.getBlockedUserId()))
            throw new RuntimeException("Invalid info");
        blackListRepository.delete(blackList);
        return "Unblock successful";
    }

    public List<User> getBlackListOfUser(Long blockerUserId) {
        List<BlackList> blackLists = blackListRepository.findAllByBlockerUserId(blockerUserId);
        List<Long> userIds = new ArrayList<>();
        blackLists.forEach(blackList -> userIds.add(blackList.getBlockedUserId()));
        return restTemplate.postForObject("http://localhost:8081/users/multiple/", userIds, List.class);
    }
}
