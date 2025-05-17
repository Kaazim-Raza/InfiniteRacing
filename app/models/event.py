def role_required(allowed_roles: list[str]):
    def inner(payload: dict = Depends(verify_token)):
        if payload.get("role") not in allowed_roles:
            raise HTTPException(status_code=403, detail="Permission denied")
        return payload
    return inner
