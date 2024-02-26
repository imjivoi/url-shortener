import type { linkSync } from 'fs';
<script setup>
const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const paragraph = {
  fontSize: '16px',
}

const logo = {
  padding: '30px 20px',
}

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}

const button = {
  backgroundColor: '#0ea5e9',
  padding: '12px 30px',
  borderRadius: '8px',
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
}

const boxInfos = {
  padding: '20px 40px',
}

const containerImageFooter = {
  padding: '45px 0 0 0',
}
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>Email confirmation</EPreview>
    <EBody :style="main">
      <EContainer>
        <ESection :style="logo">
          <ElRow>
            <ElColumn style="display: flex; align-items: center; justify-content: start">
              <EImg height="40" src="https://liny.app/apple-touch-icon.png" />
              <ElText style="font-weight: 700; font-size: 32px; color: #0ea5e9">Liny</ElText>
            </ElColumn>
          </ElRow>
        </ESection>

        <ESection :style="content">
          <ERow
            :style="{
              ...boxInfos,
              paddingBottom: 0,
            }"
          >
            <EColumn>
              <EText :style="paragraph">Hi there! Follow this link to reset the password for your user:</EText>
            </EColumn>
          </ERow>
          <ERow :style="{ ...boxInfos, paddingTop: '0' }">
            <EColumn :style="containerButton" col-span="{2}">
              <EButton href="{{ .ConfirmationURL }}" :style="button">Reset password</EButton>
            </EColumn>
          </ERow>
        </ESection>

        <EText
          :style="{
            textAlign: 'center',
            fontSize: 12,
            color: 'rgb(0,0,0, 0.7)',
          }"
        >
          © {{ new Date().getFullYear() }} liny.app
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
