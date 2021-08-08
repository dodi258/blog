---
templateKey: blog-post
title: Effective Java (4) - 인스턴스화를 막으려거든 private 생성자를 사용하라
slug: test-post-11
date: 2021-08-09T21:50:00.258Z
dateModified: 2021-08-09T21:50:00.258Z
description: Effective java - item4
featuredPost: false
category: Java
tags:
  - EffectiveJava
  - Java
  - Study
isPhotoShow: true
featuredImage: /images/effective_java5.jpg
---

# item 4: 인스턴스화를 막으려거든 private 생성자를 사용하라.


**Utility** 클래스를 어떻게 만들것인가에 대한 이야기이기도 하다. 

Static 메서드와 static 멤버를 모아서 만든 Utility class 들의 경우에 사용한다. 

<br>

**[예시]** 

**1) 기본 타입 값이나, 배열 관련 메서드들**

: java.lang.Math, java.util.Arrays


**2) 특정 인터페이스를 구현하는 객체를 생성해주는 static 메서드들**

: java.util.Collections


**3) final 클래스와 관련한 메서드들 모아놓을 때**

: final 클래스를 사용해서 하위 클래스에 메서드를 넣는 것은 불가능하기 때문이다. 

<br>

위와 같은 경우들에는


정적 멤버만 담은 유틸리티 클래스는 인스턴스로 만들어 쓰려고 설계한 것이 아니므로, 
**생성자를 private 으로 숨겨놓아 사용하지 못하게** 하면 된다. 

```java
public class UtilityClass {
    // 기본 생성자가 만들어지는 것을 막는다. (인스턴스화 방지용)
    private UtilityClass() {
        throw new AssertionClass(); 
    }
}
```

<br>

## 실제 사용되는 예 ##
스프링 에서는 [StringUtils](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/StringUtils.html) 의 경우에 abstract 클래스로 만들어서 Utils 클래스를 제공한다. 

abstract 클래스를 상속받아서 new 로 새 인스턴스를 만든다고 한들 static 으로 구현된 method 나 멤버는 static 하게 사용할 수 밖에 없어서 그러신 것 같다. 


(상속 받아도 별 소용은 없음 - 원작자가 의도하신 바는 아니겠지만 ...)
![Spring StringUtils](https://i.pinimg.com/originals/4f/31/98/4f31983c6c2d0d5ebaea6c6801aaf157.jpg)


<br>

