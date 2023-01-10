# Getting Started 

## # build project

```sh
npx create-react-app <name of project>
```

## # dependencies

### - 핵심

#### * `react` & `react-dom`

The react package contains only the functionality necessary to define React components. It is typically used together with a React renderer like react-dom for the web, or react-native for the native environments.

### - 테스팅

#### * `@testing-library/jest-dom`

#### * `@testing-library/react`

#### * `@testing-library/user-event`

### - 기타

#### * `react-scripts`

This package includes scripts and configuration used by Create React App.

#### * `web-vitals`

웹 성능을 체크하는 매트릭스 제공

https://web.dev/i18n/ko/vitals/

 - Largest Contentful Paint(최대 콘텐츠풀 페인트, LCP): 로딩 성능을 측정합니다. 우수한 사용자 경험을 제공하려면 페이지가 처음으로 로딩된 후 2.5초 이내에 LCP가 발생해야 합니다.
 - First Input Delay(최초 입력 지연, FID): 상호 작용을 측정합니다. 우수한 사용자 경험을 제공하려면 페이지의 FID가 100밀리초 이하여야 합니다. 
 - Cumulative Layout Shift(누적 레이아웃 시프트, CLS): 시각적 안정성을 측정합니다. 우수한 사용자 경험을 제공하려면 페이지에서 0.1 이하의 CLS를 유지해야 합니다.

