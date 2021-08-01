---
templateKey: blog-post
title: 우아한 Tech - 스프링부트 강의 요약
slug: test-post-8
date: 2020-06-14T00:37:45.876Z
dateModified: 2020-06-14T00:37:45.901Z
description: 우아한 테크 - 스프링부트 강의 (1) 요약
featuredPost: false
category: Study
tags:
  - SpringBoot
  - Spring
  - Study
isPhotoShow: true
featuredImage: /images/spring-boot-logo2.jpeg
---
[영상 링크](https://www.youtube.com/watch?v=z0EaPjF3pCQ) - 우아한 스프링 부트

스프링 부트: 스프링을 좀 더 편하게 사용할 수 있도록 기능을 제공하는 툴
스프링 부트가 다루는 영역 - 애플리케이션 개발 관련 거의 모든 영역
- 빌드: 프로젝트 생성, 의존성 관리, 애플리케이션 패키징 및 실행
- 코딩: 개발 툴 제공, 자동 설정, 외부 설정
- 배포 및 관리: 도커 이미지 생성, Actuator, 스프링 부트 어드민


1) 프로젝트 만들기 
[start.spring.io](https://start.spring.io)
* Project : 빌드 툴
* Spring Boot: 아무것도 적혀있지 않은 것을 체크 
    * SNAP SHOT : 개발 중인 버전 
    * M : Milestone 으로 배포, 변경될 수 있음. 
    * GA : General Availability (default)
    * RC : Release Candidate
* Project Metadata:
    * Group id, Artifact, Version 이 중요 - 프로젝트를 식별하기 때문에 
* Packaging : 
    * JAR: Java Archive (default)
    * WAR: Web Applicaton Archive

2) 빌드: 의존성 관리 
* 가장 맞는 좋은 라이브러리들의 버전을 다 명시해 놓음
* maven repository .com --> 라이브러리를 검색할 수 있음.
* 버전을 지우고 maven 에 넣으면, 알아서 처리해 줌. (스프링 부트가 버전을 관리해주는 라이브러리라면 명시하지 않는것이 낫다.)

3) 빌드: Application 실행
* Spring mvc
* 실행 방법
  -1. mvn spring-boot:run 
    스프링부트 메이븐 플러그인 사용. (= 빌드 툴 사용)
    mvn --> 설치해 놓았을 때 
    ./mvnw --> 설치 하지 않았을 때, 파일안에 있는 wrapper 실행
  -2. main class 실행. 
    가장 기본적인 자바애플리케이션 실행 방법, IDE 가 실행
  -3. JAR 패키징, java -jar
    스프링 부트 플러그인을 사용해 특수한 실행 가능한 형태의 JAR 파일을 만들 수 있음. 
    서법에 배포하는 용도로 주로 사용한다. -> 왱 ? 

    톰캣이라는 서블릿 컨테이너를 사용하는데, 서블릿 컨테이너가 8080 포트에 떠있기 때문에 애플리 케이션을 다시 거기에 띄울 수 없는 것임. 
    포트를 변경할 수 있음
    --> application.properties > server.port=15000

    maven --> package 누르면 JAR 파일 한개로 뭉쳐짐. 
    JAR 파일 한개로 뭉칠 때(= fat jar, main 메소드를 중심으로 함.), 스프링부트가 많은 일을 해줌. 
    
    Dev tools - 자동으로 애플리케이션 재기동을 해주는 툴. 
    timeleaf ? 머라고 하셨는지 까먹었다 흑 

4) 코딩: 개발 툴 - 개발중에 유용한 기능 제공
- 개발 중에 뷰 리소스 또는 템플릿에 적용되는 캐시는 오히려 불편하다. 
- 개발 중에 애플리케이션을 자주 재시작 한다. 
- 개발 중에 웹 브라우저를 자주 리로딩 한다. 
- Spring-Boot-Devtools

5) 코딩: 자동 설정 - Convention over Configuration 
1. 애플리케이션에서 설정한 빈 등록  (먼저 정의가 됨.)
  - @ComponentScan 
  - @Component, @Service, @Controller, @Repository
  - @Configuration
  - @Bean
2. 자동 설정으로 제공하는 빈 등록 (다음으로 정의가 됨, 여기서 앞에정의된 것과 중복이 된다면, 애플리케이션이 뜨지 않습니다. 자동 설정간에 중복이 된다고 하더라도 애플리케이션 안뜸.)
  - META-INF/spring.factories
      - org.springframwork.boot.autoconfigure.Enable ? 자동으로 원하는 빈을 로컬에다가 저장합니다 의존성으로 저장함. 그러면 애플리케이션 어디서나 사용할 수 있음. ! 
  - EnableAutoConfiguration
  - @Configuration && @ConditionalOnXxx

6) 코딩: 외부 설정 파일 - 코드에서 값을 밖으로 꺼내는 방법 제공
  - application.properties 또는 application.yaml, 환경 병수, java 명령어 아규먼트 등 키/값의 형태로 정의되어 있는 다양한 외부 설정을 지원한다. 
  - application.properties
    가장 구체적이고 가까운 위치에 있는 설정의 우선 순위가 높다. 
      - resources > config 디렉토리 안에 들어있는 것이 좀 더 구체적임.
      - Jar 파일로 패키징 한거에 들어있는 application.properties 밖에 또 application.properties를 만들면 더 가깝기 때문에 이 설정을 채택한다.
      - 또 root 폴더 > config > application.properties 하면 이게 더 가깝고 구체적이므로 이 설정을 채택합니다. 
  - File Encoding --> Transparent~~ 설정 클릭 [v] --> 그러면 properties의 한글이 안깨짐. 

7) 배포: 도커 이미지 빌드 - 계층형 이미지 빌드 지원 
  - 도커 이미지는 다른 이미지를 기반으로 새로운 이미지를 만들 수 있다. 
  - 계층형 이미지를 만든다면 기존 계층은 캐시로 재사용할 수 있어 효율적이다. 
  - App/ Library/ JVM --> Library 와 JVM 은 재사용.
  - spring-boot-build.image 를 누르면 됨. 
  - 이미지가 어떻게 만들어져있는지 보기 위해서 dive 라는 툴을 쓸 수 있음. 계속해서 얹어지고 ... 하면서 뭐가 언제 들어갔는지 알 수 있음. (docker dive - 와굿맨)

8) 관리 Actuator - 애플리케이션 관련 데이터 및 모니터링 정보 제공
  - 웹 (JSON) 과 JMX 지원 
  - 여러 엔드포인트 제공
    - /beans "빈" 정보 조회
    - /configprops "프로퍼티" 정보 조회.
    - /logger "로거" 정보 조회 및 변경 기능
    - /heapdump 쓰레드의 현재 상태를 내려 받을 수 있다. 
    - 이 밖에도 /metrics, /maapings 등 여러 엔드 포인트를 제공한다.
    - HATEOAS, Content-type - header 보면 보임.! 
    - logger - http 파이라는 것이 있음 curl 보다 편하게 만들어서 보낼 수 있는 기능
    - http localhost:8080/actuator/logger 
    - http localhost:8080/actuator/loggers/org.springframework.web 을 통해서 logging의 레벨을 바꿀 수 있음. 
        - http POST localhost:8080/actuator/loggers/org.springframework.web configuredLevel=debug --> 런타임중에 로거 레벨을 바꿈. 그러면 로깅이 debug로 됨. 

9) 스프링 부트 어드민
Admin 서버가 있어야 함. 
Application 에서 내보낸 엑츄에이터 정보를 그 서버에 보내야 합니다. 
     