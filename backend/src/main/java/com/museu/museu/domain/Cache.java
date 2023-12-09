package com.museu.museu.domain;

import java.util.LinkedHashMap;
import java.util.Map;

public class Cache {

    private Map<String, Object> map;
    private String mostOldKey;
    private static final int MAX_SIZE = 10;
    private static final int MIN_SIZE = 0;
    private static Cache instance;

    private Cache() {
        this.map = new LinkedHashMap<>(MAX_SIZE, 0.75f, true);
    }

    public static synchronized Cache getInstance() {
        if (instance == null) {
            instance = new Cache();
        }
        return instance;
    }

    public Object get(String key) {
        if (map.containsKey(key)) {
            return map.get(key);
        } else {
            return null;
        }
    }

    public void put(String key, Object value) {

        if (map.size() == MIN_SIZE) {
            mostOldKey = key;
        }

        if (map.size() == MAX_SIZE) {
            map.remove(mostOldKey);
            mostOldKey = map.entrySet().iterator().next().getKey();
            map.put(key, value);
        } else {
            map.put(key, value);
        }
    }

    public void remove(String key) {
        map.remove(key);
    }

    public void imprime() {
        map.forEach((k, v) -> System.out.println(k + " " + v));
    }

}
