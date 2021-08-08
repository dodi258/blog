---
templateKey: blog-post
title: Effective Java (5) - 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라
slug: test-post-12
date: 2021-08-09T23:00:00.258Z
dateModified: 2021-08-09T23:50:00.258Z
description: Effective java - item5
featuredPost: false
category: Java
tags:
  - EffectiveJava
  - Java
  - Study
isPhotoShow: true
featuredImage: /images/effective_java5.jpg
---
## item 5: 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라

어떤 클래스가 하나 이상의 자원에 의존할 때 


정적 유틸리티나 
싱글톤으로 잘못 설계할 수 있다. 

<br>

**[예시]**
(**맞춤법 검사기 SpellChecker**) 가 (**사전 Lexicon**) 을 "의존한다"
1) 정적 유틸리티로 구현
   ```java
   public class SpellChecker {
       private static final Lexicon dictionary = new KoreanDictionary();
       
       private SpellChecker(); // 객체 생성 방지 - private 생성자

       public static boolean isValid(String word) {
           return true; 
       }
   }
   ```


2) 싱글톤으로 구현 
   ```java
   public class SpellChecker {
       private final Lexicon dictionary = new KoreanDictionary();
       
       private SpellChecker(); // 객체 생성 방지 - private 생성자
       public static SpellChecker SPELL_CHECKER = new SpellChecker(); 

       public boolean isValid(String word) {
           return true; 
       }
   }
   ```

위의 두 예에서는 Lexcion 이 KoreanDictionary 에 의존한다고 명시했지만, 사실은 EnglishDictionary 혹은 ChineaseDictionary 도 Lexcion이 요구할 수 있는 것이다. 
그래서 저 사전 하나만 명시해서는 SpellChecker를 유연하게 사용할 수 없다. 


**SpellChecker 가 여러 사전을 사용할 수 있도록 하자.**

<br>

## **의존 객체 주입**
인스턴스를 생성할 때 생정자에 필요한 자원을 넘겨주는 방식
```java
public class SpellChecker {
    private final Lexicon dictionary; 

    // 의존성 주입
    public SpellChecker(Lexicon dictionary) {
        this.dictionary = Objects.requireNonNull(dictionary);
    }
}
```

사용할 때 
```java
public static void main(String[] args) {
    Lexcion lexcion = new EnglishDictionary)(); // 원하는 것 사용 
    // Lexcion lexcion = new KoreanDictionary)();

    SpellChecker spellChecker = new SpellChecker(lexcion);
    spellChecker.isValid("Good ~ ")
}
```


### **장점**

1) 유연성 - 자원이 몇 개든, 의존 관계가 어떻든 상관없이 잘 작동한다. 
2) 테스트 용이성 - 각 클래스를 따로 목킹(Mocking) 가능, 각 클래스에서 동작 테스트 하면 됨. (각자 알아서 테스트)
3) 재사용성
4) 불변을 보장 (item 17), 여러 클라이언트가 의존 객체들을 안심하고 사용

<br>

### **단점**
의존 객체 주입이 유연성과 테스트 용이성을 개선해주긴 하지만, 

의존성이 수천 개나 되는 큰 프로젝트에서는 코드를 어집럽게 만들기도 한다. 

그럴때는 Dagger, Guice, Spring과 같은 의존 객체 주입 프레임워크를 사용하면 어질러짐을 해소할 수 있다. 


<br>

## **변형**: 생성자에 자원 팩터리를 넘겨주는 방식
이 방식을 이용해서 클라이언트는 자신이 명시한 타입의 하위 타입이라면 무엇이든 생성할 수 있는 팩터리를 넘길 수 있다. 

<br>

**Supplier 를 사용한 예제**


```java
public class SpellChecker {
    private final Lexicon dictionary; 

    // 의존성 주입
    public SpellChecker(Supplier<Lexicon> dictionary) {
        this.dictionary = Objects.requireNonNull(dictionary.get());
    }

    public static void main(String[] args) {
        Lexicon lexicon = new KoreanDictionay(); 

        SpellChecker spellChecker = new SpellChecker(() -> lexcion)
        /**
            () -> lexcion 은 곧 

            new Supplier<Lexcion>() {
            @Override
            public Lexcion get() {
                return lexicion; 
            }
        }
        **/
    }
}

```

<br>



