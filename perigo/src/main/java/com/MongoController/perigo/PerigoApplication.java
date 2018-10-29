package com.MongoController.perigo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

import com.MongoController.perigo.models.User;

import ch.qos.logback.core.pattern.Converter;



@SpringBootApplication
public class PerigoApplication {

	public static void main(String args[]) {
		SpringApplication.run(PerigoApplication.class);
		final String uri = "http://localhost:9000/user/5bd36feefdba650e3c337894";
		

		
		
		RestTemplate restTemplate = new RestTemplate();

		User test = restTemplate.getForObject(uri, User.class);
		System.out.println(test.lastName);
	}


/*	public void run(String... args) throws Exception {

		URL url = new URL(uri);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();
		while ((inputLine = br.readLine()) != null) {
			response.append(inputLine);
		}
		br.close();
		System.out.println(response.toString());
	
		RestTemplate restTemplate = new RestTemplate();
		//ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
		User test = restTemplate.getForObject(uri, User.class);
		System.out.println(test.lastName);
		//ObjectMapper mapper = new ObjectMapper();
		
		//JsonNode root = mapper.readTree(response.getBody());
		
		
	}
		//JsonNode name = root.path("name");
*/
}
