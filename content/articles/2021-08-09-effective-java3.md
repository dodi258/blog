---
templateKey: blog-post
title: Effective Java (3) - private 생성자나 열거 타입으로 싱글턴임을 보증하라
slug: test-post-10
date: 2021-08-09T17:10:00.258Z
dateModified: 2021-08-09T17:10:00.258Z
description: Effective java - item3
featuredPost: false
category: Java
tags:
  - EffectiveJava
  - Java
  - Study
isPhotoShow: true
featuredImage: /images/effective_java5.jpg
---
# 아이템 3 : private 생성자나 enum 타입으로 싱글턴임을 보증하라
### **싱글톤 ?** 
애플리케이션 안에서 클래스의 인스턴스가 한개만 쓰이는것을 말한다. 

### **싱글톤을 만드는 방식**
<br>
    1) Final 필드 <br>
    2) 정적 (static) 팩토리 메서드 <br>
    3) Enum <br>
   
<br>

## Final 필드

public static 멤버가 final 필드인 방식
```java
public class Elvis {
    public static final Elvis INSTANCE = new Elvis(); 
    private Elvis() {...}
}
```
private 으로 만들어진 생성자는 Public static final 필드인 Elvis.INSTANCE 를 초기화할 때 한 번만 호출된다.

다만, [리플렉션](https://www.baeldung.com/java-reflection)을 이용해서 private 생성자를 호출할 수 있다. 

이런 경우는 생성자를 수정하여 두 번째 객체가 생성되려 할 때 예외를 던지면 된다.

```java
//////// Example //////////
public class Class {
    public static final Class INSTANCE = new Class(); 
    private int count; 

    private Class() {
        count ++; 
        if (count > 1) {
            new Throw IllegalStateException("This object should be singleton!")
        }
    }
}

////////// Main ////////////
public class Main {
    public static void main(String[] args) throws NoSuchMethodException {
        Class instance1 = Class.INSTANCE;
    }
}
```
### **장점**
1) 해당 클래스가 싱글턴임이 API 에 명백히 드러남. 
2) 간결하다. 


<br>

## Static 팩토리 메서드
정적 팩토리 메서드를 public static 멤버로 제공
```java
public class Elvis {
    private static final Elvis INSTANCE = new Elvis();
    public Elvis() {...}
    
    // static factory method
    public static Elvis getInstance() {
        return INSTANCE; 
    }
}
```
Elvis.getInstance()는 항상 같은 객체의 참조를 반환한다. 
이 또한 리플렉션에 대한 예외를 똑같이 적용해야 한다. 

<br>

### **장점**
1) `API 를 바꾸지 않고도 싱글턴이 아니게 변경할 수 있다.` 
```java
public class Elvis {
    private static final Elvis INSTANCE = new Elvis();
    public Elvis() {...}
    
    // return 타입만 바꿔주면 Singleton 이 아니게 변경 가능하다. 
    public static Elvis getInstance() {
        // return INSTANCE; 
        return new Elivis(); // 만들때 마다 새로운 instance 
    }

public class Main {
    public static void main(String[] args) {
        Elvis elvis = Elivs.getInstance(); // main 에서는 아까와 같이 사용만 하면됨 (API 변경이 없기 때문에)
    }
}
```
2) 정적 펙토리를 `제네릭 싱글턴 팩터리`로 만들수 있다. (아이템 30)
3) 정적 펙토리의 메서드 참조를 [Supplier](https://docs.oracle.com/javase/8/docs/api/java/util/function/Supplier.html) 로 사용할 수 있다.

    : `getInstance()가 Supplier 인터페이스의 (get()) 구현체로 취급될 수 있다.`
```java
Supplier<Elivis> instance = Elivis::getInstance()
```

<br>
<br>

잠깐 **직렬화(Serialization)** 에서 싱글톤 인스턴스의 사용... 

## 직렬화 (Serialization)
*직렬화*는 데이터를 어디에 옮길 때 짐을 싸는 것이다. 
*역직렬화*는 데이터를 옮기고 나서 그 짐싼 것을 다시 푸는 것. 
```java
public class Elivis implements Serialization {}
```

역 직렬화를 할 때 같은 타입의 인스턴스가 여러개가 생길 수 있다.

그것을 방지하기 위해서는
- 모든 인스턴스의 필드에 `transient` (= 직렬화 하지 않겠다는 말) 추가
- `readResolve` 메소드를 구현. 
```java
private Object readResolve(
    return INSTANCE;
)
```
참고 : [객체 직렬화의 비밀](http://www.oracle.com/technetwork/articles/java/javaserial-1536170.html)

<br>

## Enum
public 필드 방식과 비슷하지만 (전통방식), 더 간결하고, 직렬화/역직렬화도 신경쓸 필요없고, 
리플렉션 공격도 막을 수 있는 방법. 

> "대부분의 상황에서는 원소가 하나뿐인 열거 타입이 싱글턴을 만드는 가장 좋은 방법이다."

<br>

```java
public enum Elvis {
    INSTANCE; 

    public String getName() {
        return "Elvis";
    }
}
```
### **단점**
만드려는 싱글턴이 Enum 이외의 클래스를 상속할 수 없음, 근데 인터페이스 구현은 됨. 

<br>
<br>

**번외**
## Spring 에서 Sington 
실무에서 가장 많이 쓰이고, 실용적인 방법 (스프링을 사용한다면)

어노테이션 (annotation) 을 클래스에 붙여서 스프링 빈으로 등록한 다음에
기본 스코프가 singleton 이기 때문에 그것을 그대로 사용하면 됨. 
@Autowired 를 사용하면 싱글톤인 instance 가 쓰입니다. 

**예시**
```java
// Service - instance 만들 클래스
@Serivce
public class Service {...}
```

**<싱글톤 X>**
```java
public class NoSingletonTest {
    public static void main(String[] args) {
        Service service1 = new Serivce(); 
        Service service2 = new Serivce(); 
        ...
    }
}
```
**<싱글톤 O - @Autowired>**
```java
public class SingletonTest {
    @Autowired
    Service service1;
    ... 
}
```

<br>

-------------------

<br>

**<싱글톤 O - 기본 scope 빈>**

```java
@Configuration
public class Config {
    // @ annotation 이 붙은 클래스들이 빈으로 등록
}
```

```java
public class Main {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class);
        Service service1 = applicationContext.getBean(Service.class); 
        Service service2 = applicationContext.getBean(Service.class); // 몇번을 빈을 꺼내도 같은 빈임. 
        ...
    }
}
```


**<싱글톤 X - Prototype 빈>**
```java
@Configuration
@Scope("prototype")
public class Config {
}```

```java
public class Main {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class);
        Service service1 = applicationContext.getBean(Service.class); 
        Service service2 = applicationContext.getBean(Service.class); // 꺼낼 때 마다 다른 빈
        ...
    }
}
```

<br>

---------

<br>

**출처**
1) Effective Java 3/E : 이펙티브 자바 3판 (책)
2) [이팩티브 자바] #3 싱글톤을 만드는 여러가지 방법 그중에 최선은?: [백기선님 유투브](https://www.youtube.com/watch?v=xBVPChbtUhM&list=PLfI752FpVCS8e5ACdi5dpwLdlVkn0QgJJ&index=3)

<br>

