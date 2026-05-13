package com.universidad.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    public String interpretarMensaje(String mensaje) {

        String url = "https://api.openai.com/v1/responses";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // PROMPT (MUY IMPORTANTE)
        String prompt = "Clasificá el siguiente mensaje en UNA sola intención:\n\n" +
                "Opciones:\n" +
                "GET_LONGEST_CAREER\n" +
                "GET_SHORTEST_CAREER\n" +
                "GET_SUBJECTS\n" +
                "GET_CAREER_WITH_MOST_SUBJECTS\n" +
                "GET_CAREERS_BY_TOPIC\n" +
                "UNKNOWN\n\n" +
                "Mensaje: " + mensaje + "\n\n" +
                "Respondé SOLO con la intención.";

        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-4.1-mini");
        body.put("input", prompt);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            // EXTRAER RESPUESTA
            List output = (List) response.getBody().get("output");

            Map first = (Map) output.get(0);
            List content = (List) first.get("content");

            Map textObj = (Map) content.get(0);
            String text = textObj.get("text").toString();

            return text.trim();

        } catch (Exception e) {
            e.printStackTrace();
            return "UNKNOWN";
        }
    }
}